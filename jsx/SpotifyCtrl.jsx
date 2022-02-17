function spotifyctrl_script(thisObj) {
    var spotifyctrl = {};

    spotifyctrl.BuildUI = function(thisObj) {

      spotifyctrl.scriptName = "SpotifyCtrl"
      spotifyctrl.ms = 4;
      spotifyctrl.bs = [0, 0, 35, 35];

      spotifyctrl.palette = (thisObj instanceof Panel) ? thisObj : new Window("palette" , spotifyctrl.scriptName, undefined , {resizeable:true});
      spotifyctrl.palette.spacing = 0;
      spotifyctrl.palette.margins = 4;

      var filepath = new File(new File($.fileName).parent);
      var scriptpath = filepath.fullName;
  	  var libpath = scriptpath + "/SpotifyCtrl_lib";
      var iconpath = libpath + "/SpotifyCtrl_icons";

      var button_size = [0,0,35,35];

      var mainGroup = spotifyctrl.palette.add("group");
      mainGroup.orientation = "stack";
      mainGroup.alignment = ["center", "center"];

      var rowGroup = mainGroup.add("group");
      rowGroup.orientation = "row";
      rowGroup.alignment = ["center", "center"];
      rowGroup.spacing = spotifyctrl.ms;
      rowGroup.margins = 0;

      /*
      var dl_raw = scriptpath.slice(1,2);
      var dl_up = dl_raw.toUpperCase();

      var scriptpath_nl = String(scriptpath).slice(2,);
      var scriptpath_all = dl_up + ":" + scriptpath_nl;
      var batscript_path = scriptpath_all + "/SpotifyCtrl_lib"
      */

      var muteBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_mute.png", {style:"toolbutton"});
      var vlmmBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_vlmm.png", {style:"toolbutton"});

      var shufflemodegrp = rowGroup.add("group")
      shufflemodegrp.orientation = "stack";

      var shuffle_offBtn = shufflemodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_shuffle_off.png", {style:"toolbutton"});
      shuffle_offBtn.visible = true;

      var shuffle_onBtn = shufflemodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_shuffle_on.png", {style:"toolbutton"});
      shuffle_onBtn.visible = false;

      var prevBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_prev.png", {style:"toolbutton"});

      var playermodegrp = rowGroup.add("group")
      playermodegrp.orientation = "stack";

      var playBtn = playermodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_play.png", {style:"toolbutton"});
      playBtn.visible = false;
      var pauseBtn = playermodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_pause.png", {style:"toolbutton"});
      pauseBtn.visible = true;

      var nextBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_next.png", {style:"toolbutton"});

      var repeatmodegrp = rowGroup.add("group")
      repeatmodegrp.orientation = "stack";

      var repeat_offBtn = repeatmodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_repeat_off.png", {style:"toolbutton"});
      repeat_offBtn.visible = true;

      var repeat_contextBtn = repeatmodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_repeat_track.png", {style:"toolbutton"});
      repeat_contextBtn.visible = false;

      var repeat_trackBtn = repeatmodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_repeat_context.png", {style:"toolbutton"});
      repeat_trackBtn.visible = false;

      var vlmpBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_vlmp.png", {style:"toolbutton"});
      var track_infoBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_track_info.png", {style:"toolbutton"});

      muteBtn.helpTip = "Mute";
      vlmmBtn.helpTip = "Minus Volume";
      shuffle_offBtn.helpTip = "Shuffle OFF";
      shuffle_onBtn.helpTip = "Shuffle ON";
      prevBtn.helpTip = "Prev";
      playBtn.helpTip = "Play";
      pauseBtn.helpTip = "Pause";
      nextBtn.helpTip = "Next";
      repeat_offBtn.helpTip = "Repeat OFF";
      repeat_contextBtn.helpTip = "Repeat context";
      repeat_trackBtn.helpTip = "Repeat track";
      vlmpBtn.helpTip = "Plus Volume";
      track_infoBtn.helpTip = "Show track info";

      spotifyctrl.palette.layout.layout(true)

      spotifyctrl.palette.onResizing = function(){
        spotifyctrl.palette.layout.resize();
      };

      spotifyctrl.palette.onResize = function(){
        spotifyctrl.palette.layout.resize();
      };

      muteBtn.onClick = function(){
        app.executeCommand(app.findMenuCommandId("SpotifyCtrl_mute.jsx"))
      }

      vlmmBtn.onClick = function(){
        app.executeCommand(app.findMenuCommandId("SpotifyCtrl_volume_m.jsx"))
      }

      shuffle_offBtn.onClick = function(){
        if(shuffle_offBtn.visible == true){
          app.executeCommand(app.findMenuCommandId("SpotifyCtrl_shuffle_on.jsx"))
          shuffle_offBtn.visible = false;
          shuffle_onBtn.visible = true;
        }
      }

      shuffle_onBtn.onClick = function(){
        if(shuffle_onBtn.visible == true){
          app.executeCommand(app.findMenuCommandId("SpotifyCtrl_shuffle_off.jsx"))
          shuffle_onBtn.visible = false;
          shuffle_offBtn.visible = true;
        }
      }

      prevBtn.onClick = function(){
        app.executeCommand(app.findMenuCommandId("SpotifyCtrl_prev.jsx"))
      }

      playBtn.onClick = function(){
        if(playBtn.visible == true){
          app.executeCommand(app.findMenuCommandId("SpotifyCtrl_play.jsx"))
          playBtn.visible = false;
          pauseBtn.visible = true;
        }
      }

      pauseBtn.onClick = function(){
        if(pauseBtn.visible == true){
          app.executeCommand(app.findMenuCommandId("SpotifyCtrl_pause.jsx"))
          pauseBtn.visible = false;
          playBtn.visible = true;
        }
      }

      nextBtn.onClick = function(){
        app.executeCommand(app.findMenuCommandId("SpotifyCtrl_next.jsx"))
      }

      repeat_offBtn.onClick = function(){
        if(repeat_offBtn.visible == true){
          app.executeCommand(app.findMenuCommandId("SpotifyCtrl_repeat_context.jsx"))
          repeat_offBtn.visible = false;
          repeat_contextBtn.visible = true;
        }
      }

      repeat_contextBtn.onClick = function(){
        if(repeat_contextBtn.visible == true){
          app.executeCommand(app.findMenuCommandId("SpotifyCtrl_repeat_track.jsx"))
          repeat_contextBtn.visible = false;
          repeat_trackBtn.visible = true;
        }
      }

      repeat_trackBtn.onClick = function(){
        if(repeat_trackBtn.visible == true){
          app.executeCommand(app.findMenuCommandId("SpotifyCtrl_repeat_off.jsx"))
          repeat_trackBtn.visible = false;
          repeat_offBtn.visible = true;
        }
      }

      vlmpBtn.onClick = function(){
        app.executeCommand(app.findMenuCommandId("SpotifyCtrl_volume_p.jsx"))
      }

      track_infoBtn.onClick = function(){
        app.executeCommand(app.findMenuCommandId("SpotifyCtrl_track_info.jsx"))
      }

  }

  spotifyctrl.BuildUI(thisObj);
  if(!(spotifyctrl.palette instanceof Panel)) {
    spotifyctrl.palette.show();
  }
}

spotifyctrl_script(this);
