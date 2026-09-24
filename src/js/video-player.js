(function () {
    'use strict';

    //#region Plyr Player Initialization
    const player = new Plyr('#course-video', {
        controls: [
            'play-large',
            'play',
            'current-time',
            'progress',
            'duration',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen'
        ],

        // Persian (Farsi) localization strings
        i18n: {
            restart: 'شروع دوباره',
            rewind: 'عقب بردن {seektime} ثانیه',
            play: 'پخش',
            pause: 'توقف',
            fastForward: 'جلو بردن {seektime} ثانیه',
            seek: 'جستجو',
            played: 'پخش شده',
            buffered: 'بارگذاری شده',
            currentTime: 'زمان فعلی',
            duration: 'مدت زمان',
            volume: 'صدا',
            mute: 'بی‌صدا',
            unmute: 'باصدا',
            enableCaptions: 'فعال‌سازی زیرنویس',
            disableCaptions: 'غیرفعال‌سازی زیرنویس',
            enterFullscreen: 'ورود به حالت تمام‌صفحه',
            pip: 'تصویر در تصویر',
            exitFullscreen: 'خروج از حالت تمام‌صفحه',
            frameTitle: 'پلیر برای {title}',
            captions: 'زیرنویس',
            settings: 'تنظیمات',
            speed: 'سرعت',
            normal: 'عادی',
            quality: 'کیفیت',
            loop: 'تکرار',
            start: 'شروع',
            end: 'پایان',
            all: 'همه',
            reset: 'بازنشانی',
            disabled: 'غیرفعال',
            enabled: 'فعال',
            advertisement: 'تبلیغ'
        },

        // Available panels in the settings menu
        settings: ['captions', 'quality', 'speed', 'loop'],

        // Keyboard shortcuts: only when player is focused
        keyboard: { focused: true, global: false },

        // Tooltip visibility settings
        tooltips: { controls: true, seek: true },

        // Captions configuration
        captions: { active: false, language: 'auto', update: false },

        // Playback speed options
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },

        // Video aspect ratio
        ratio: '16:9',

        // Persist player preferences in localStorage
        storage: { enabled: true, key: 'plyr' },

        // Fullscreen behavior
        fullscreen: { enabled: true, fallback: true, iosNative: false },

        autoplay: false,
        autopause: true,
        clickToPlay: true,
        hideControls: true,
        resetOnEnd: false,
        seekTime: 10,
        volume: 1,
        muted: false,
        invertTime: true,
        toggleInvert: true,
        displayDuration: true,
        disableContextMenu: true
    });
    //#endregion

    //#region Player Event Listeners
    player.on('ready', function () {
        console.log('✅ Plyr آماده است');
    });

    player.on('play', function () {
        console.log('▶️ پخش شروع شد');
    });

    player.on('pause', function () {
        console.log('⏸️ پخش متوقف شد');
    });

    player.on('ended', function () {
        console.log('⏹️ پخش تمام شد');
    });

    player.on('enterfullscreen', function () {
        console.log('🖥️ ورود به تمام‌صفحه');
    });

    player.on('exitfullscreen', function () {
        console.log('🖥️ خروج از تمام‌صفحه');
    });

    player.on('error', function (event) {
        console.error('❌ خطا در پلیر:', event.detail);
    });
    //#endregion

    //#region Global Player API (window)
    window.coursePlayer = player;

    /**
     * Replace the current video source and start playback.
     * @param {string} newSrc - URL of the new video file.
     * @param {string} [newPoster] - Optional poster image URL.
     */
    window.changeCourseVideo = function (newSrc, newPoster) {
        player.source = {
            type: 'video',
            title: 'ویدیوی جدید',
            sources: [{ src: newSrc, type: 'video/mp4' }],
            poster: newPoster || ''
        };
        player.play();
    };

    // Public API methods exposed on window.coursePlayerAPI
    window.coursePlayerAPI = {
        play: function () { player.play(); },
        pause: function () { player.pause(); },
        stop: function () { player.stop(); },
        restart: function () { player.restart(); },
        forward: function (s) { player.forward(s || 10); },
        rewind: function (s) { player.rewind(s || 10); },
        toggleMute: function () { player.muted = !player.muted; },
        toggleFullscreen: function () { player.fullscreen.toggle(); },
        setVolume: function (v) { player.volume = v; },
        getCurrentTime: function () { return player.currentTime; },
        seekTo: function (t) { player.currentTime = t; },
        destroy: function () { player.destroy(); }
    };
    //#endregion

    //#region Lesson Playlist & Persistence
    document.addEventListener('DOMContentLoaded', () => {
        const previewBtns = document.querySelectorAll('.episode-play');
        const lessonTitles = document.querySelectorAll('.lesson-title');

        const DEFAULT_SRC = 'assets/videos/course-video-01.mp4';
        const STORAGE_KEY = 'activeLessonSrc';

        /**
         * Remove the "active" highlight from all lesson titles.
         */
        function clearHighlight() {
            lessonTitles.forEach((t) => {
                t.classList.remove('text-primary');
                t.classList.add('text-dark');
            });
        }

        /**
         * Highlight the lesson title that matches the given video source.
         * @param {string} src - Video source URL.
         */
        function highlightBySrc(src) {
            clearHighlight();
            if (!src) return;

            const fileName = src.split('/').pop();

            let activeBtn = null;
            previewBtns.forEach((btn) => {
                if (btn.dataset.video && btn.dataset.video.split('/').pop() === fileName) {
                    activeBtn = btn;
                }
            });
            if (!activeBtn) return;

            const title = activeBtn.closest('li').querySelector('.lesson-title');
            if (title) {
                title.classList.remove('text-dark');
                title.classList.add('text-primary');
            }
        }

        /**
         * Load a lesson into the player, optionally autoplaying.
         * @param {string} src - Video source URL.
         * @param {{autoplay?: boolean}} [options]
         */
        function activateLesson(src, { autoplay = true } = {}) {
            if (!src) return;

            player.source = {
                type: 'video',
                title: 'درس',
                sources: [
                    {
                        src: src,
                        type: 'video/mp4'
                    }
                ],
            };

            if (autoplay) {
                player.once('canplay', () => {
                    player.play().catch(() => { });
                });
            }

            highlightBySrc(src);
            localStorage.setItem(STORAGE_KEY, src);
        }

        // Restore last watched lesson on page load (without autoplay)
        const savedSrc = localStorage.getItem(STORAGE_KEY) || DEFAULT_SRC;
        activateLesson(savedSrc, { autoplay: false });

        // Bind click handlers to all "play" buttons
        previewBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                const newSrc = btn.dataset.video;
                if (!newSrc) return;

                activateLesson(newSrc, { autoplay: true });
                player.elements.container.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });

        // Sync across tabs when localStorage changes
        window.addEventListener('storage', (e) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                activateLesson(e.newValue, { autoplay: false });
            }
        });
    });
    //#endregion

})();