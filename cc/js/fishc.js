let currentIndex_ = 0

function writeIntro(intro = '', time, callback) {
    let connect = document.querySelectorAll('.connect')
    if (connect.length < 1) {
        resume.innerHTML = intro
    } else {
        connect[connect.length - 1].innerHTML = intro
    }
    setTimeout(() => {
        callback()
    }, time);
}

function startResume() {
    writeIntro(balloon, 700, () => {
        writeIntro(line, 200, () => {
            writeIntro(text, 0, () => {
                writeText(textArr[currentIndex_])
            })
        })
    })
}

let num = 0
let t = setInterval(() => {
    if (num <= style.length) {
        codeEdit.innerHTML = Prism.highlight(style.substr(0, num), Prism.languages.css);
        codeEdit.scrollTop = 100000
        styleContent.innerHTML = style.substr(0, num)
        num++
    } else {
        clearInterval(t)
    }
}, 70)
setTimeout(() => {
    if (document.body.clientWidth < 500) {
        setTimeout(() => {
            resume.style.cssText = 'height:70vh!important'
        }, 5000);
    }
    startResume()
}, 10000);


let sbTimer = null

function toggleScrollBar(self) {
    self = self.target
    clearTimeout(sbTimer)

    if (self.getAttribute('class') != 'sbShow')
        self.classList.add('sbShow')

    sbTimer = setTimeout(() => {
        self.classList.remove('sbShow')
    }, 800);
}