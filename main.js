'use strict'

var sDesc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
var fDesc = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae veniam excepturi nisi deserunt inventore sit beatae, omnis rem illo est expedita distinctio fugit adipisci voluptas dolor? Sequi esse enim vitae.'
var dataImages = [
    { path: 'img/img-1.jpg', shortDesc: sDesc, fullDesc: fDesc },
    { path: 'img/img-2.jpg', shortDesc: sDesc, fullDesc: fDesc },
    { path: 'img/img-3.jpg', shortDesc: sDesc, fullDesc: fDesc },
    { path: 'img/img-4.jpg', shortDesc: sDesc, fullDesc: fDesc },
    { path: 'img/img-5.jpg', shortDesc: sDesc, fullDesc: fDesc },
    { path: 'img/img-6.jpg', shortDesc: sDesc, fullDesc: fDesc },
]

/**
 * Handler for create 
 * image block object
 * @param {object} data 
 * @param {function} onMoreClick 
 */
function ImageBlock(data, useOpen) {
    this.data = data;
    this.wrap = document.createElement('div');
    this.wrap_desc = document.createElement('div');
    this.p = document.createElement('p');
    this.img = document.createElement('img');
    this.btn = document.createElement('button');

    this.btn.innerHTML = 'more ...';
    this.btn.type = 'button';

    this.btn.onclick = function () {
        var lastOpen = useOpen();
        if(lastOpen) {
            lastOpen.p.innerHTML = lastOpen.data.shortDesc;
            lastOpen.wrap.classList.remove('open');
        }
        useOpen(this);
        
        this.p.innerHTML = this.data.fullDesc;
        this.wrap.classList.add('open');
    }.bind(this);

    this.img.src = this.data.path;
    this.p.innerHTML = this.data.shortDesc;

    this.wrap_desc.className = 'wrap-desc';
    this.wrap_desc.appendChild(this.p);
    this.wrap_desc.appendChild(this.btn);

    this.wrap.appendChild(this.img);
    this.wrap.appendChild(this.wrap_desc);
    this.wrap.className = 'img-block';
    this.render = function () {
        return this.wrap;
    }
}

/**
 * Handler for create images manager
 * @param {array} images 
 * @param {string} id_name 
 */
function ImageManager (images, id_name) {
    this.images = images;
    this.open = undefined;

    this.useOpen = function (value) {
        if(value) {
            this.open = value;
        }
        return this.open;
    }.bind(this);

    // Get element from document by id name
    this.container = document.querySelector(id_name);
  
    // Handler for render all images on page
    this.showListImages = function() {
        for (var image of this.images) {
            var imgBlock = new ImageBlock(image, this.useOpen);
            this.container.appendChild(imgBlock.render());
        }
    }
}

var manager = new ImageManager(dataImages, '#images-list');

manager.showListImages();


