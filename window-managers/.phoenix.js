lookOfDisapproval = "ಠ_ಠ";
rageOfDongers = "";
whyLook = "ლ(ಠ_ಠლ)";
var bound_keys = {};
// bound_keys.b = {}
// bound_keys.b.create_custom = null
// Start/select apps
//bound_keys = { i: { custom_binding: hotkey, create_custom: hotkey, bound: bool}}

App.create_app_binding = function(key) {

    api.alert(key)
    bound_keys[key].create_custom.disable();
    app_title = Window.focusedWindow().app().title();
    //bound_keys[key].custom_binding =
    api.alert('binding');
    api.bind(key, hyper, function() {
        App.focusOrStart(app_title);
    });

};

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

function toTop(fillCols, maxCols) {
    var win = Window.focusedWindow();
    var frame = win.frame();
    var screenFrame = win.screen().frameWithoutDockOrMenu();
    api.alert('fx: ' + frame.y);
    api.alert('sx: ' + screenFrame.y);
    frame.y = screenFrame.y;
    frame.x = screenFrame.x;
    frame.height = screenFrame.height * (fillCols / maxCols);
    frame.width = screenFrame.width;
    win.setFrame(frame);
}

function toBottom(fillCols, maxCols) {
    var win = Window.focusedWindow();
    var frame = win.frame();
    var screenFrame = win.screen().frameWithoutDockOrMenu();
    frame.y = screenFrame.y + (screenFrame.height * (fillCols / maxCols));
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

var hyper = ["cmd", "alt", "shift", "ctrl"];
var padding = 4;
var editor = 'Sublime Text'
var finder = 'Finder'

// window size adjust keys
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
api.bind('return', hyper, fullScreen);


// Some kind of hinting
api.bind('space ', hyper, function() {});

// App hotkeys
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
    App.focusOrStart('Wunderlist');
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
    App.focusOrStart('DigitalColor Meter')
});

// bound_keys.b.create_custom = api.bind('b', hyper, function() {
//     App.create_app_binding('b')
// });

bindable_keys = 'plokmijnuhb'.split('');
bound_keys = {};
//bound_keys = { i: { custom_binding: hotkey, create_custom: hotkey, bound: bool}}

for (var i = 0; i < bindable_keys.length; i++) {
    var key = bindable_keys[i];
    bound_keys[key] = {};
    bound_keys[key].bound = false;
    api.alert(key);
    bound_keys[key].create_custom = api.bind(key, hyper, function() {

        App.create_app_binding(key);
    });
}








///asdasdpl