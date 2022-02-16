import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import argparse
import time
import ast

import VERSION_INFO
import API_KEY
software_version = VERSION_INFO.VERSION()

os.environ['SPOTIPY_CLIENT_ID'] = API_KEY.CLIENT_ID()
os.environ['SPOTIPY_CLIENT_SECRET'] = API_KEY.CLIENT_SECRET()
os.environ['SPOTIPY_REDIRECT_URI'] = API_KEY.REDIRECT_URI()

args_cmd_choices = ['play', 'pause', 'next', 'prev', 'repeat_off', 'repeat_track', 'repeat_context', 'shuffle_on', 'shuffle_off', 'volume_p', 'volume_m', 'mute', 'track_info']

parser = argparse.ArgumentParser(description = 'ae_spotify_ctrl ver' + software_version)

parser.add_argument('--cmd', choices = args_cmd_choices, required = True)
parser.add_argument('--vlm', default = 10, required = False)

args = parser.parse_args()
sp_command = args.cmd
sp_volume = args.vlm

sp_scope = "user-read-playback-state,user-modify-playback-state"

sp_api = spotipy.Spotify(auth_manager = SpotifyOAuth(scope = sp_scope, cache_path = 'C:\\Users\\' + os.environ['USERNAME'] + '\\Documents\\.cache'))

player_info = sp_api.current_playback()
track_info = sp_api.current_user_playing_track()

artist_name = ''

current_play_state = player_info['is_playing']
current_volume = int(player_info['device']['volume_percent'])
current_repeat_state = player_info['repeat_state']
current_shuffle_state = player_info['shuffle_state']

track_name = track_info['item']['name']
album_name = track_info['item']['album']['name']

for cnt in range(len(track_info['item']['artists'])):
    if cnt == len(track_info['item']['artists']) - 1:
        artist_name += track_info['item']['artists'][cnt]['name']
    else:
        artist_name += track_info['item']['artists'][cnt]['name'] + ' / '

track_info_data = ('Track: ' + track_name + '\n'
                   'Album: ' + album_name + '\n'
                   'Artist: ' + artist_name)

if sp_command == 'play' and current_play_state == False:
    sp_api.start_playback()

if sp_command == 'pause' and current_play_state == True:
    sp_api.pause_playback()

if sp_command == 'next':
    sp_api.next_track()

if sp_command == 'prev':
    sp_api.previous_track()

if sp_command == 'repeat_off':
    sp_api.repeat('off')

if sp_command == 'repeat_track':
    sp_api.repeat('track')

if sp_command == 'repeat_context':
    sp_api.repeat('context')

if sp_command == 'shuffle_on':
    sp_api.shuffle(True)

if sp_command == 'shuffle_off':
    sp_api.shuffle(False)

if sp_command == 'volume_p' and current_volume < 100:
    sp_api.volume(current_volume + int(sp_volume))

if sp_command == 'volume_m' and current_volume > 0:
    sp_api.volume(current_volume - int(sp_volume))

if sp_command == 'mute':
    sp_api.volume(0)

if sp_command == 'track_info':
    print(track_info_data)
