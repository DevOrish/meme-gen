'use strict';
var gNextId = 101
var gImgs;
var gMeme;

//created to enable adding img later
function createImgs() {
    if (gImgs) gNextId = gImgs[gImgs.length - 1].id + 1;
    var imgs = [
        createImg('img/img2.jpg', ['dance', 'funny']),
        createImg('img/9.jpg', ['baby', 'funny', 'cruel']),
        createImg('img/meme1.jpg', ['matrix', 'funny']),
        createImg('img/5.jpg', ['baby', 'succsess']),
        createImg('img/19.jpg', ['wtf']),
        createImg('img/img4.jpg', ['trump', 'funny']),
        createImg('img/Ancient-Aliens.jpg', ['aliens']),
        createImg('img/img11.jpg', ['obama', 'funny', 'laugh']),
        createImg('img/putin.jpg', ['putin', 'serious']),
        createImg('img/leo.jpg', ['leo', 'honor']),
        createImg('img/12.jpg', ['hecht', 'point']),
        createImg('img/8.jpg', ['tell me more', 'funny']),
        createImg('img/Oprah.jpg', ['oprah', 'funny'])
    ]
    gImgs = imgs
}

function createImg(imgUrl, keywords) {
    return {
        id: gNextId++,
        imgUrl,
        keywords
    }
}

function creategMeme(imgId, canvas) {
    var size;
    if (canvas.width <= 250) size = 15
    if (canvas.width <= 350) size = 30
    if (canvas.width <= 450) size = 45
    if (canvas.width > 750) size = 60
    else size = 50
    return {
        selectedImgId: imgId,
        selectedTxtIdx: 0,
        txts:
            [{
                line: 'Enter text Here',
                size,
                align: 'center',
                color: 'white',
                outlineColor: 'black',
                font: 'Impact',
                lineWidth: 3,
                locY: 60,
                locX: canvas.width / 2,
            }, {
                line: 'Enter text Here',
                size,
                align: 'center',
                color: 'white',
                outlineColor: 'black',
                font: 'Impact',
                lineWidth: 3,
                locY: canvas.height - 30,
                locX: canvas.width / 2
            }]
    }
}

function addTxt(ctx, canvas) {
    var txts = gMeme.txts
    var locY = canvas.height / 2
    var fontData = ctx.font.split(' ')
    var size;
    var font;
    if (txts.length === 0) {
        locY = 60
        size = +fontData[0].slice(0, -2)
        font = fontData[1]
    }
    else {
        size = txts[txts.length - 1].size
        font = txts[txts.length - 1].font
    }
    if (txts.length === 1) locY = canvas.height - 30
    if (txts.length === 2) locY = canvas.height / 2
    var newTxt = {
        line: 'Enter text Here',
        size,
        align: 'center',
        color: 'white',
        outlineColor: 'black',
        font,
        lineWidth: ctx.lineWidth,
        locY,
        locX: canvas.width / 2
    }
    gMeme.txts.push(newTxt)
    gMeme.selectedTxtIdx = txts.length - 1
}

function updateTxtIdx() {
    var currTxtIdx = gMeme.selectedTxtIdx
    currTxtIdx += 1
    if (currTxtIdx > gMeme.txts.length - 1) currTxtIdx = 0
    gMeme.selectedTxtIdx = currTxtIdx
}

function removeTxt() {
    gMeme.txts.splice(gMeme.selectedTxtIdx, 1)
}

function saveImgData(imgData) {
    saveToStorage('img-Data', imgData)
}

function loadImgData() {
    return loadFromStorage('img-Data')
}

function getImgs() {
    return gImgs
}

function getgMeme() {
    return gMeme
}

