lookOfDisapproval = "ಠ_ಠ";
rageOfDongers = "";
whyLook = "ლ(ಠ_ಠლ)";
var bound_keys = {};
// bound_keys.b = {}
// bound_keys.b.create_custom = null
// Start/select apps
// bound_keys = { i: { custom_binding: hotkey, create_custom: hotkey, bound: bool}}

// App.create_app_binding = function(key) {
//     api.alert(key)
//     bound_keys[key].create_custom.disable();
//     app_title = Window.focusedWindow().app().title();
//     //bound_keys[key].custom_binding =
//     api.alert('binding');
//     var b = api.bind(key, hyper, function() {
//         App.focusOrStart(app_title);
//     });
// };

App.allWithTitle = function(title) {
    return _(this.runningApps()).filter(function(app) {
        if (app.title() === title) {
            return true;
        }
    });
};

App.focusOrStart = function(title) {
    var apps = App.allWithTitle(title);
    if (_.isEmpty(apps)) {
        api.alert(rageOfDongers + " Starting " + title);
        api.launch(title)
        return;
    }
    var windows = _.chain(apps)
        .map(function(x) {
            return x.allWindows();
        })
        .flatten()
        .value();
    activeWindows = windows; //TODO
    // this code disables switching to apps which have all apps minimized
    // activeWindows = _(windows).reject(function(win) {
    //     return win.isWindowMinimized();
    // });
    if (_.isEmpty(activeWindows)) {
        api.alert(whyLook + " All windows minimized for " + title);
        return;
    }

    activeWindows.forEach(function(win) {
        win.focusWindow();
    });
};
// Adjust window size

function toLeft(fillCols, maxCols) {
    var win = Window.focusedWindow();
    var frame = win.frame();
    var screenFrame = win.screen().frameWithoutDockOrMenu();
    frame.y = screenFrame.y;
    frame.x = screenFrame.x;
    frame.height = screenFrame.height;
    frame.width = screenFrame.width * (fillCols / maxCols);
    win.setFrame(frame);
}
var nudgeAmount = 15;
function shrinkLeft() {
    var win = Window.focusedWindow();
    var frame = win.frame();
    frame.width = frame.width - nudgeAmount;
    win.setFrame(frame);
}

function expandRight() {
    var win = Window.focusedWindow();
    var frame = win.frame();
    frame.width = frame.width + nudgeAmount;
    win.setFrame(frame);
}

function shrinkRight() {
    var win = Window.focusedWindow();
    var frame = win.frame();
    frame.width = frame.width - nudgeAmount;
    frame.x = frame.x + nudgeAmount;
    win.setFrame(frame);
}

function expandLeft() {
    var win = Window.focusedWindow();
    var frame = win.frame();
    frame.width = frame.width + nudgeAmount;
    frame.x = frame.x - nudgeAmount;
    win.setFrame(frame);
}

function shrinkUp() {
    var win = Window.focusedWindow();
    var frame = win.frame();
    var screenFrame = win.screen().frameWithoutDockOrMenu();
    if (frame.height > screenFrame.height - 15) {
        frame.height = screenFrame.height - 14;
    }
    frame.height = frame.height - nudgeAmount;
    win.setFrame(frame);
}

function expandDown() {
    var win = Window.focusedWindow();
    var frame = win.frame();
    frame.height = frame.height + nudgeAmount;
    win.setFrame(frame);
}

function expandUp() {
    var win = Window.focusedWindow();
    var frame = win.frame();
    frame.height = frame.height + nudgeAmount;
    frame.y = frame.y - nudgeAmount;
    win.setFrame(frame);
}

function shrinkDown() {
    var win = Window.focusedWindow();
    var frame = win.frame();
    var screenFrame = win.screen().frameWithoutDockOrMenu();
    // get height
    // if bottom is near bottom set bottom higher
    // make height nudge less than previous hieght

    if (frame.height + frame.y > screenFrame.height) {
        frame.height = (screenFrame.height - frame.y + 10);
        frame.y += 5;
    }
    frame.height = frame.height - nudgeAmount;
    frame.y = frame.y + nudgeAmount;
    win.setFrame(frame);
}

function toRight(fillCols, maxCols) {
    var win = Window.focusedWindow();
    var frame = win.frame();
    var screenFrame = win.screen().frameWithoutDockOrMenu();
    frame.y = screenFrame.y;
    frame.x = screenFrame.x + screenFrame.width * (fillCols / maxCols);
    frame.height = screenFrame.height;
    frame.width = screenFrame.width * (1 - fillCols / maxCols);
    win.setFrame(frame);
}

function toTop(fillCols, maxCols, dontFillWidth) {
    var win = Window.focusedWindow();
    var frame = win.frame();
    var screenFrame = win.screen().frameWithoutDockOrMenu();
    frame.y = screenFrame.y;
    frame.height = screenFrame.height * (fillCols / maxCols);

    if (!dontFillWidth) {
        frame.x = screenFrame.x;
        frame.width = screenFrame.width;
    }
    win.setFrame(frame);
}

function toBottom(fillCols, maxCols) {
    var win = Window.focusedWindow();
    var frame = win.frame();
    var screenFrame = win.screen().frameWithoutDockOrMenu();
    frame.y = screenFrame.y + (screenFrame.height * ((maxCols - fillCols) / maxCols));
    frame.x = screenFrame.x;
    frame.height = screenFrame.height * (fillCols / maxCols);
    frame.width = screenFrame.width;
    win.setFrame(frame);
}

function fullScreen() {
    var win = Window.focusedWindow();
    var screenFrame = Window.focusedWindow().screen().frameWithoutDockOrMenu();
    win.setFrame(screenFrame);
}

var modals_enabled = false;
var modals = [];
function enableModals() {
    _(modals).each(function(modal){
        modal.enable();
    });
}

function disableModals() {
    _.each(modals, function(modal){
        modal.disable();
    });
}

function toggleModals() {
    if (modals_enabled) {
        disableModals();
        modals_enabled = false;
    } else {
        enableModals();
        modals_enabled = true;
    }
    api.alert('modals enabled: ' + modals_enabled, 0.4);
}

var hyper = ["cmd", "alt", "shift", "ctrl"];
var padding = 4;
var editor = 'Sublime Text'
var finder = 'Finder'
api.bind('space', hyper, toggleModals);
// window size adjust keys
modals.push(api.bind('left', undefined, function() {
    shrinkLeft();
}));
modals.push(api.bind('right', ['shift'], function() {
    expandRight();
}));
modals.push(api.bind('right', undefined, function() {
    shrinkRight();
}));
modals.push(api.bind('left', ['shift'], function() {
    expandLeft();
}));
modals.push(api.bind('down', ['shift'], function() {
    expandDown();
}));
modals.push(api.bind('up', undefined, function() {
    shrinkUp();
}));
modals.push(api.bind('up', ['shift'], function() {
    expandUp();
}));
modals.push(api.bind('down', undefined, function() {
    shrinkDown();
}));
// modals.push(api.bind('right', undefined, function() {
//     toRight(6, 10);
//     disableModals();
//     modals_enabled = false;
// }));
// modals.push(api.bind('up', undefined, function() {
//     toTop(6, 10);
//     disableModals();
//     api.alert('asd');
//     modals_enabled = false;
// }));
// modals.push(api.bind('down', undefined, function() {
//     toBottom(4, 10);
//     disableModals();
//     modals_enabled = false;
// }));
// modals.push(api.bind('return', undefined, function(){
//     fullScreen();
//     disableModals();
//     modals_enabled = false;
// }));
disableModals();
// Some kind of hinting
//api.bind('space ', hyper, function() {});

// App hotkeys

// q w

api.bind('left', hyper, function() {
    toLeft(6, 10);
});
api.bind('right', hyper, function() {
    toRight(6, 10);
});
api.bind('up', hyper, function() {
    toTop(6, 10);
});
api.bind('down', hyper, function() {
    toBottom(4, 10);
});
api.bind('return', hyper, function(){
    fullScreen();
});

api.bind('c', hyper, function() {
    App.focusOrStart('Google Chrome');
});
api.bind('d', hyper, function() {
    App.focusOrStart('iTerm');
});
api.bind('e', hyper, function() {
    App.focusOrStart(editor);
});
api.bind('v', hyper, function() {
    App.focusOrStart('HipChat');
});
api.bind('f', hyper, function() {
    App.focusOrStart(finder);
})
api.bind('w', hyper, function() {
    App.focusOrStart('iBooks');
});
api.bind('x', hyper, function() {
    App.focusOrStart('Xcode')
});
api.bind('s', hyper, function() {
    App.focusOrStart('System Preferences')
});
api.bind('r', hyper, function() {
    App.focusOrStart('Preview')
});
api.bind('z', hyper, function() {
    App.focusOrStart('Digital Color Meter')
});
api.bind('g', hyper, function() {
    App.focusOrStart('Firefox')
});
api.bind('a', hyper, function() {
    App.focusOrStart('Messages')
});
api.bind('q', hyper, function() {
    App.focusOrStart('Spotify')
})
api.bind('t', hyper, function() {
    App.focusOrStart('YNAB 4')
})
var b = api.bind('b', hyper, function() {
    App.focusOrStart('Notes')
})


// bound_keys.b.create_custom = api.bind('b', hyper, function() {
//     App.create_app_binding('b')
// });

// bindable_keys = 'plokmijnuhb'.split('');
// bound_keys = {};
//bound_keys = { i: { custom_binding: hotkey, create_custom: hotkey, bound: bool}}

// for (var i = 0; i < bindable_keys.length; i++) {
//     var key = bindable_keys[i];
//     bound_keys[key] = {};
//     bound_keys[key].bound = false;
//     api.alert(key);
//     bound_keys[key].create_custom = api.bind(key, hyper, function() {

//         App.create_app_binding(key);
//     });
// }



//all existing funcionality should work the same
//press hyper space activates layediting mode
//can save that?




///asdasdpl
