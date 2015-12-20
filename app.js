// Function for moving the pointer to the correct location based on
// the current server time
function movePointer() {
    // Get the time (server time = UTC time)
    var currentTime = moment.utc();
    var localTime = moment();

    // Format with leading 0s so 09:08 doesn't end up as 9:8
    var hour = ("00" + currentTime.hour()).slice(-2);
    var minute = ("00" + currentTime.minute()).slice(-2);

    var localHour = ("00" + localTime.hour()).slice(-2);
    var localMinute = ("00" + localTime.minute()).slice(-2);

    // How far along are we (in  % ) of the current 2 hour event cycles?
    var percentOfTwoHours = ((hour % 2) + (minute / 60)) * 50;

    // Set the text and move the pointer to that %
    $('.pointer .server span').text(hour + ":" + minute);
    $('.pointer .local span').text(localHour + ":" + localMinute);
    $('.pointer').css('left', percentOfTwoHours + "%");
}

var currentStartHour = 0;

// Function for updating the times
function updateTimes(localHourDif) {

    var currentTime = moment.utc();

    // What hour was the start of this 2 hour block?
    var startHour = (Math.floor(currentTime.hour() / 2) * 2) + localHourDif;

    if (startHour !== currentStartHour) {
        //update bossevents
        drawBars();
        currentStartHour = startHour;
    }

    // For each block within a map
    $('.bar>div').each(function () {

        var offset = $(this).data('offset');
        var correctedTime = "" + (startHour + (offset > 59 ? 1 : 0));

        // Format the time so 9:8 becomes 09:08
        var hour = ("00" + correctedTime).slice(-2);
        var minute = ("00" + (offset % 60)).slice(-2);

        // Set the text
        $(this).find('span').text(hour + ":" + minute);
    });
}

// Function for setting up the bars when first loaded
// based on the meta event info at the start
function setupBarsForMetaEvents(metaEvents) {

    $('.barGroup').remove();

    // For each meta event..
    $.each(metaEvents, function (key, metaEvent) {
        if (!metaEvent.phases) return;

        // Create a bar for it on the page
        var $bar = $('<div class="bar"></div>');
        var offset = 0;

        // For each phase within a bar
        $.each(metaEvent.phases, function (i, metaPhase) {

            // Create a block to represent that phase, and set the color
            // and width based on the duration and color info
            var $block = $('<div style="background-color: #F5F5F5;" data-offset="0"> <span></span> <strong></strong></div>');
            $block.css('background', metaPhase.color);
            $block.css('width', (100 * metaPhase.duration / 120) + "%");

            // Store the bar's offset for use in updating the time
            $block.data('offset', offset);
            offset += metaPhase.duration;

            // Set the phase name for this block (e.g. Sandstorm)
            $block.find('strong').text(metaPhase.name);

            var title = "";
            if (metaPhase.title) {
                title = "area: " + metaPhase.title;
            }
            if (metaPhase.nextText) {
                title += " " + metaPhase.nextText;
            }
            $block.prop('title', title);

            // add this block to the bar
            $bar.append($block);
        });

        var $barGroup = $('<div class="barGroup"></div>');

        // Set the name for the meta event and add the bar to the page
        $barGroup.append($('<h2>' + metaEvent.name + '</h2><br>'));
        $barGroup.append($bar);

        $('.wrapper').append($barGroup);
    });
}

var addEventData = function (metas, bossdata) {

    var currentTime = moment.utc();
    // What hour was the start of this 2 hour block?
    var startHour = Math.floor(currentTime.hour() / 2) * 2;

    var minTime = new Date(1970, 1, 1, startHour, 0, 0, 0).getTime();
    var maxTime = new Date(1970, 1, 1, startHour + 2, 0, 0, 0).getTime();


    metas.wb_s = {
        name: "World Bosses Standard",
        phases: []
    };
    metas.wb_h = {
        name: "World Bosses Hard",
        phases: []
    };
    var listOfDataInRange_s = [];
    var listOfDataInRange_h = [];

    var next_s = {
        data: null,
        timestamp: new Date().getTime(),
        uptime: ""
    };
    var next_h = {
        data: null,
        timestamp: new Date().getTime(),
        uptime: ""
    };

    $.each(bossdata, function (key, data) {
        $.each(data.uptime, function (key, uptime) {

            var uptimeSplitArray = uptime.split(":");

            // so the the eventhour is higher the the maxtime value. without this at starttime "22", there is no next event
            if (uptimeSplitArray[0] === "00") {
                uptimeSplitArray[0] = "24";
            }

            var timestamp = new Date(1970, 1, 1, uptimeSplitArray[0], uptimeSplitArray[1], 0, 0).getTime();

            if (timestamp >= minTime && timestamp < maxTime) {

                if (data.scale === "hardcore") {
                    listOfDataInRange_h.push({
                        data: data,
                        timestamp: timestamp,
                        next: null
                    })
                } else {
                    listOfDataInRange_s.push({
                        data: data,
                        timestamp: timestamp,
                        next: null
                    })
                }

            }

            if (timestamp >= maxTime) {
                var next;
                if (data.scale === "hardcore") {
                    next = next_h;
                } else {
                    next = next_s;
                }

                if (timestamp < next.timestamp) {
                    next.data = data;
                    next.timestamp = timestamp;
                    next.uptime = uptime;
                }
            }

        });
    });

    //sort by data.timestamp
    listOfDataInRange_s.sort(function SortByName(a, b) {
        return ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0));
    });
    listOfDataInRange_s[listOfDataInRange_s.length - 1].next = next_s;

    listOfDataInRange_h.sort(function SortByName(a, b) {
        return ((a.timestamp < b.timestamp) ? -1 : ((a.timestamp > b.timestamp) ? 1 : 0));
    });
    listOfDataInRange_h[listOfDataInRange_h.length - 1].next = next_h;

    //make timeline and fill holes
    metas.wb_s.phases = makeTimelineAndFillHolesWithData(listOfDataInRange_s, 15);
    metas.wb_h.phases = makeTimelineAndFillHolesWithData(listOfDataInRange_h, 15);


    return metas;
};

var makeTimelineAndFillHolesWithData = function (listOfDataInRange, durationPerEvent) {
    var phasesData = [];

    for (var i = 0; i < listOfDataInRange.length; i++) {

        phasesData.push({
            name: listOfDataInRange[i].data.name.en,
            duration: 15,
            color: rainbow(200, i + 28),
            title: listOfDataInRange[i].data.map.en
        });

        //do not add this at the end
        if (i < listOfDataInRange.length - 1) {
            var timedif = listOfDataInRange[i + 1].timestamp - listOfDataInRange[i].timestamp;
            var difInMinutes = Math.floor(timedif / 60000);

            difInMinutes = difInMinutes - durationPerEvent;

            if (difInMinutes > 0) {

                phasesData.push({
                    name: "",
                    duration: difInMinutes,
                    color: "#FFFFFF"
                });

            }
        }

        var lastIndex = listOfDataInRange.length - 1;

        if (i === lastIndex) {
            if (listOfDataInRange[lastIndex].next.data) {
                phasesData[phasesData.length - 1].nextText = "\nnext: " + listOfDataInRange[lastIndex].next.uptime + " " + listOfDataInRange[lastIndex].next.data.name.en;
            }

        }
    }
    return phasesData;
};

//https://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
function rainbow(numOfSteps, step) {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r, g, b;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch (i % 6) {
        case 0:
            r = 1;
            g = f;
            b = 0;
            break;
        case 1:
            r = q;
            g = 1;
            b = 0;
            break;
        case 2:
            r = 0;
            g = 1;
            b = f;
            break;
        case 3:
            r = 0;
            g = q;
            b = 1;
            break;
        case 4:
            r = f;
            g = 0;
            b = 1;
            break;
        case 5:
            r = 1;
            g = 0;
            b = q;
            break;
    }
    var c = "#" + ("00" + (~~(r * 255)).toString(16)).slice(-2) + ("00" + (~~(g * 255)).toString(16)).slice(-2) + ("00" + (~~(b * 255)).toString(16)).slice(-2);
    return (c);
}

var drawBars = function () {
    var eventData = addEventData(metas, bossdata.worldboss);
    setupBarsForMetaEvents(eventData);
};

$('document').ready(function () {

    drawBars();

    //// Start the pointer/times at the right place
    movePointer();

    var currentTimeZoneOffsetInHours = -(new Date().getTimezoneOffset() / 60);
    updateTimes(currentTimeZoneOffsetInHours);

    // set up a timer to update the pointer and times every 5 seconds
    setInterval(function () {
        movePointer();
        updateTimes(currentTimeZoneOffsetInHours);
    }, 5000);

});
