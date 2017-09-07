(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
// @desc use getAlbum method to store album info
// @type {object}
        
        var currentAlbum = Fixtures.getAlbum();
        
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
// @desc Active song object from list of songs
// @type {Object}
        SongPlayer.currentSong = null;
        
// @desc Buzz object audio file
// @type {Object}
        var currentBuzzObject = null;
        
// @function setSong
// @desc Stops currently playing song and loads new audio file as currentBuzzObject
// @param {Object} song
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong();
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
// @function playSong
// @desc plays song and sets song.playing to true so album.html changes play/pause icon
//        @param {Object} song
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
// @function pauseSong
// @desc pauses song and sets song.playing to false so album.html changes play/pause icon
// @param {Object} song
        var pauseSong = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }
        
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
// @function SongPlayer.play(song)
// @desc plays a song from the beginning if the song has not already started and continues playing the song from where it left off if not
// @params {Object} song
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
// @function SongPlayer.pause(song)
// @desc pauses a song at its current time point
// @params {Object} song
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            pauseSong(song);
        };
// @function SongPlayer.previous()
// @desc switches current song to the previous song
// @params {object}
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
// @desc if currentSong is less than 0 then stop the song and   
            if(currentSongIndex < 0) {
                stopSong();
// @desc else conditional that moves to the previous song and automatically plays 
            } else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
// @function SongPlayer.next()
// @desc switches current song to the next song 
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if(currentSongIndex < 0) {
                stopSong();
// @desc else conditional that moves to the previous song and automatically plays 
            } else{
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();