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
            name: 'Nevada',
            singer: 'Vicetone',
            path: 'https://aredir.nixcdn.com/NhacCuaTui924/Nevada-Vicetone-4494556.mp3?st=_IjpS9u0LjapNgzm058wVw&e=1623143773',
            image: 'https://i.pinimg.com/originals/f8/6f/33/f86f3378e656883b33594f06d78d1634.jpg',
        },
        {
            name: 'Light It Up',
            singer: 'Robin Hustin x TobiMorrow',
            path: 'https://aredir.nixcdn.com/NhacCuaTui968/LightItUp-RobinHustinTobimorrowJex-5619031.mp3?st=kzpVQ5kKnf2LlcAqM6lnxg&e=1623143881',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2019/01/08/1/3/d/a/1546913843457_640.jpg',
        },
        {
            name: 'Yoru ni kakeru',
            singer: 'YOASOBI',
            path: 'https://aredir.nixcdn.com/NhacCuaTui992/YoruNiKakeru-YOASOBI-6149490.mp3?st=68hnFhtGF6RukKDcDcW9Mw&e=1623132179',
            image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/16788ee5-3436-474a-84fd-6616063a1a9a/de2f4eq-bc67fa17-8dae-46a9-b85d-fe8082c34841.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzE2Nzg4ZWU1LTM0MzYtNDc0YS04NGZkLTY2MTYwNjNhMWE5YVwvZGUyZjRlcS1iYzY3ZmExNy04ZGFlLTQ2YTktYjg1ZC1mZTgwODJjMzQ4NDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.dABuqANeQEs6FBfslZHdG1lW_gDwzf61yqiSABROSx0',
        },
        {
            name: 'Muộn rồi mà sao còn',
            singer: 'Sơn Tùng M-TP',
            path: 'https://aredir.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=w9AA-eyRI7yD_VYGfvVWeQ&e=1623141624',
            image: 'https://pbs.twimg.com/media/Ez5jRyVVgAQN6Kh.jpg',
        },
        {
            name: 'See You Again',
            singer: 'Charlie Puth ft Wiz Khalifa',
            path: 'https://aredir.nixcdn.com/NhacCuaTui894/SeeYouAgain-KurtSchneiderEppicAlexGoot-3888930.mp3?st=1q73myBS8FKr8Rx0snpMJw&e=1623144094',
            image: 'https://nghiennhac.com/wp-content/uploads/2020/09/see-you-again-0.jpg',
        },

        {
            name: 'Symphony',
            singer: 'Clean Bandit',
            path: 'https://aredir.nixcdn.com/Sony_Audio37/Symphony-CleanBanditZaraLarsson-4822950.mp3?st=sPgJSXtRXYpT_rznXyez6g&e=1623144426',
            image: 'https://i.ytimg.com/vi/PIf9GvWaxQQ/maxresdefault.jpg',
        },
        {
            name: 'Waiting For Love',
            singer: 'Avicii',
            path: 'https://aredir.nixcdn.com/Unv_Audio45/WaitingForLove-Avicii-4203283.mp3?st=mXGv6kIqbxg_coAyUqzlnw&e=1623144462',
            image: 'https://i.ytimg.com/vi/Hmbm3G-Q444/maxresdefault.jpg',
        },
        {
            name: 'Alone',
            singer: 'Marshmello',
            path: 'https://aredir.nixcdn.com/NhacCuaTui927/Alone-Marshmello-4456939.mp3?st=RTsMC9tNcKEi8fd0iKtdaA&e=1623144502',
            image: 'https://i.ytimg.com/vi/UNB8F0ObA4g/maxresdefault.jpg',
        },
        {
            name: 'Something Just Like This',
            singer: 'The Chainsmokers & Coldplay',
            path: 'https://aredir.nixcdn.com/Sony_Audio39/SomethingJustLikeThis-TheChainsmokersColdplay-5337136.mp3?st=VQuH6VgNsPlBizbk-c7n3w&e=1623144556',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2017/11/07/a/1/4/5/1510038809679_640.jpg',
        },
        {
            name: 'Sugar',
            singer: 'Maroon 5',
            path: 'https://aredir.nixcdn.com/Unv_Audio73/Sugar-Maroon5-3338455.mp3?st=3FUWEyikJePPeAuREUcw9g&e=1623144644',
            image: 'https://i.ytimg.com/vi/7vw84EkHOlY/maxresdefault.jpg',
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