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
      var prevBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_prev.png", {style:"toolbutton"});

      var playermodegrp = rowGroup.add("group")
      playermodegrp.orientation = "stack";

      var playBtn = playermodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_play.png", {style:"toolbutton"});
      playBtn.visible = false;
      var pauseBtn = playermodegrp.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_pause.png", {style:"toolbutton"});
      pauseBtn.visible = true;

      var nextBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_next.png", {style:"toolbutton"});
      var vlmpBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_vlmp.png", {style:"toolbutton"});
      var track_infoBtn = rowGroup.add("iconbutton", spotifyctrl.bs, iconpath + "/icon_track_info.png", {style:"toolbutton"});

      muteBtn.helpTip = "Mute";
      vlmmBtn.helpTip = "Minus Volume";
      prevBtn.helpTip = "Prev";
      playBtn.helpTip = "Play";
      pauseBtn.helpTip = "Pause";
      nextBtn.helpTip = "Next";
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
        system.callSystem(callcmd + " --cmd mute\"");
      }

      vlmmBtn.onClick = function(){
        system.callSystem(callcmd + " --cmd volume_m\"");
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

      vlmpBtn.onClick = function(){
        system.callSystem(callcmd + " --cmd volume_p\"");
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
