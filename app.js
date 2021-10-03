const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);


// 1.render song => done
// 2.scroll top => done
// 3.play/pause/seek => done
// 4.cd rotate => done
// 5.next/prev =>done
// 6.random => done
// 7.next/repeat when end => done
// 8.active song
// 9.scroll active song into view
// 10.play song when click
const player = $('.player')
const playlist = $('.playlist')
const heading = $('header h2')
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const progress = $('#progress')
const repeatBtn = $('.btn-repeat')
const randomBtn = $('.btn-random')

const app = {
    songs: [{
            name: 'I'm Always By Your Side',
            singer: 'Vincenzo OST',
            path: 'https://tainhac123.com/download/im-always-by-your-side-vincenzo-ost-john-park.vET8HWDOeyC6.html',
            image: 'https://pbs.twimg.com/media/Euo61NTXMAIZGyI.jpg',
        },
        {
            name: 'Có em đời bỗng vui',
            singer: 'Chillies',
            path: 'https://tainhac365.org/download-music/341585',
            image: 'https://avatar-nct.nixcdn.com/song/share/2020/02/07/3/8/e/d/1581043806043.jpg',
        },
        {
            name: 'Thinking Out Loud',
            singer: 'Ed Sheeran',
            path: 'https://data26.chiasenhac.com/downloads/1433/3/1432972-8b9af6a9/128/Thinking%20Out%20Loud%20-%20Ed%20Sheeran.mp3',
            image: 'data:image/jpeg;base64,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',
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
            image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
        },
        {
            name: 'từ thích thích thành thương thương',
            singer: 'Amee-hoàng Dũng',
            path: 'https://data3.chiasenhac.com/downloads/2138/3/2137812-dd9daf4b/m4a/Tu%20Thich%20Thich%20Thanh%20Thuong%20Thuong%20-%20AMe.m4a',
            image: 'https://data.chiasenhac.com/data/cover/133/132245.jpg',
        },

        {
            name: 'Hai triệu năm',
            singer: 'Đen Vâu-Biên',
            path: 'https://data19.chiasenhac.com/downloads/2020/3/2019411-0e59ee91/m4a/Hai%20Trieu%20Nam%20-%20Den_%20Bien.m4a',
            image: 'https://data.chiasenhac.com/data/cover/107/106262.jpg',
        },
        {
            name: 'Trốn tìm',
            singer: 'Đen Vâu-MTV band',
            path: 'https://data25.chiasenhac.com/stream2/2172/3/2171043-de949f5d/m4a/Tron%20Tim%20-%20Den_%20MTV%20Band.m4a',
            image: 'https://data.chiasenhac.com/data/artist_avatar/5/4212.jpg',
        },
        {
            name: 'Nàng thơ',
            singer: 'Hoàng Dũng',
            path: 'https://data3.chiasenhac.com/downloads/2107/3/2106863-664f8a95/m4a/Nang%20Tho%20-%20Hoang%20Dung.m4a',
            image: 'https://data.chiasenhac.com/data/cover/126/125060.jpg',
        },
        {
            name: '3107 3',
            singer: 'Không biết :))',
            path: 'https://tainhac365.org/download-music/497519',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
            name: 'Hãy Trao Cho Anh',
            singer: 'Sơn Tùng MTP',
            path: 'https://tainhacmienphi.biz/download-music/91782',
            image: 'https://avatar-nct.nixcdn.com/song/share/2019/07/02/2/1/d/0/1562050952834.jpg',
        },
        {
            name: 'Tay To',
            singer: 'MCK',
            path: 'https://tainhac365.org/download-music/456397',
            image: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/e/0/2/c/e02cd4e0a723ed9b3510a95b5f6dbdd7.jpg',
        },
        {
            name: 'Yêu Như Ngày Hôm Qua',
            singer: 'THE SHEEP',
            path: 'https://tainhac365.org/download-music/18964',
            image: 'https://avatar-nct.nixcdn.com/song/2017/09/25/0/5/c/7/1506314223434_640.jpg',
        },
    ],
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
    isRandom: false,

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    loadCurrentSong: function() {
        heading.innerText = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    scrollToActive: function() {
        $$('.song')[this.currentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    },
    random: function() {
        do {
            this.currentIndex = Math.floor(Math.random() * this.songs.length)
        } while (this.curentIndex === this.currentIndex)
        this.loadCurrentSong()
        this.render()
        audio.play()
    },
    active: function() {
        $$('.song')[this.currentIndex].classList.add('active')
    },
    handleEvents: function() {
        const _this = this
            // Xử lí khi scrollTop
        const cdWidth = cd.offsetWidth
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
        }

        // Xử lí bấm bút play
        playBtn.onclick = function() {
            _this.isPlaying ? audio.pause() : audio.play()
        }

        // Xử lý khi  playing Song
        audio.onplay = function() {
            _this.isPlaying = true
            audio.play()
            player.classList.add('playing')
            _this.active()
            _this.scrollToActive()
        }

        // Xử lý khi pause
        audio.onpause = function() {
            _this.isPlaying = false
            audio.pause()
            player.classList.remove('playing')
        }

        // Xử lý khi bấm nút nextSong
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.random()
            } else {
                _this.currentIndex++
                    if (_this.currentIndex >= _this.songs.length) {
                        _this.currentIndex = 0
                    }
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
        }

        // Xử lí khi bấm nút prevSong
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.random()
            } else {
                _this.currentIndex--
                    if (_this.currentIndex < 0) {
                        _this.currentIndex = _this.songs.length - 1
                    }
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
        }

        // Xử lí khi tiến độ bài hát thay đổi 
        audio.ontimeupdate = function() {
            progress.value = (audio.currentTime / audio.duration) * 100
        }

        // Xử lí khi tua bài
        progress.onchange = function() {
            const progressPercent = progress.value
            const songDuration = audio.duration
            const currentTime = songDuration * progressPercent / 100
            audio.currentTime = currentTime
        }

        //xử lí khi endSong
        audio.onended = function() {
            if (_this.isRepeat) {
                _this.loadCurrentSong()
                audio.play()
            } else if (_this.isRandom) {
                _this.random()
            } else {
                nextBtn.click()
            }
        }

        // Xử lí khi ấn repeatBtn
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.isRepeat ? repeatBtn.classList.add('active') : repeatBtn.classList.remove('active')
        }

        // Xử lí khi ấn randomBtn 
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.isRandom ? randomBtn.classList.add('active') : randomBtn.classList.remove('active')
        }

        // xử lí activeSong
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            console.log(songNode)
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.getAttribute('data'))
                    _this.loadCurrentSong()
                    _this.scrollToActive()
                    _this.render()
                    audio.play()
                }
            }
        }
    },
    render: function() {
        let htmls = app.songs.map(function(song, index) {
            return `
        <div class="song ${index===this.currentIndex? 'active':''}" data="${index}" >
            <div class="${song.image}" style="background-image: url('${song.path}')"></div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
        `
        })
        playlist.innerHTML = htmls.join('')
    },
    start: function() {
        this.defineProperties()
        this.handleEvents()
        this.loadCurrentSong()
        this.render()
        audio.play()
    }
}

app.start()
