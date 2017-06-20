/*
This file is part of 'hamster-shell-extension'.

'hamster-shell-extension' is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

'hamster-shell-extension' is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with 'hamster-gtk'.  If not, see <http://www.gnu.org/licenses/>.

Copyright (c) 2011 Jerome Oufella <jerome@oufella.com>
Copyright (c) 2011-2012 Toms Baugis <toms.baugis@gmail.com>
Icons Artwork Copyright (c) 2012 Reda Lazri <the.red.shortcut@gmail.com>
Copyright (c) 2016 - 2017 Eric Goller / projecthamster <elbenfreund@projecthamster.org>
*/


function formatDuration(minutes) {
    return "%02d:%02d".format((minutes - minutes % 60) / 60, minutes % 60);
}

function formatDurationHuman(minutes) {
    let hours = (minutes - minutes % 60) / 60;
    let mins = minutes % 60;
    let res = "";

    if (hours > 0 || mins > 0) {
        if (hours > 0)
            res += "%dh ".format(hours);

        if (mins > 0)
            res += "%dmin".format(mins);
    } else {
        res = "Just started";
    }

    return res;
}

function formatDurationHours(minutes) {
    return new Number(minutes / 60.0).toFixed(1) + "h";
}

function fromDbusFact(fact) {
    // converts a fact coming from dbus into a usable object
    function UTCToLocal(timestamp) {
        // TODO - is this really the way?!
        let res = new Date(timestamp);
        return new Date(res.setUTCMinutes(res.getUTCMinutes() + res.getTimezoneOffset()));
    }

    result = {
        name: fact[4],
        startTime: UTCToLocal(fact[1]*1000),
        endTime: fact[2] != 0 ? UTCToLocal(fact[2]*1000) : null,
        description: fact[3],
        activityId: fact[5],
        category: fact[6],
        tags: fact[7],
        date: UTCToLocal(fact[8] * 1000),
        delta: Math.floor(fact[9] / 60), // minutes
        id: fact[0]
    };
    return result;
};

function fromDbusFacts(facts) {
    let res = [];
    for (var fact of facts) {
        res.push(fromDbusFact(fact));
    }

    return res;
};


function parseFactString(input) {
    let res = {
        "time": null,
        "activity": input,
        "category": null,
        "description": null,
        "tags": null,
    };
}
