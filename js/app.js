'use strict'
function Hornes(data){
    this.image_url=data.image_url;
    this.title=data.title;
    this.description=data.description;
    this.keyword=data.keyword;
    this.horns=data.horns;

}

Hornes.prototype.render=function(){
let hornesClone=$(`.photo-template`).clone();
hornesClone.removeClass('photo-template');
hornesClone.find('img').text(this.image_url);
hornesClone.find('h2').text(this.title);
hornesClone.find('p').text(this.description);
hornesClone.find('h4').text(this.keyword);
hornesClone.find('h5').text(this.hornes);
$('main').append(hornesClone);


}

$.get('./data/page-1.json')
.then(data =>{
    data.forEach((value,index )=> {
        let hornes=new Hornes(value);
hornes.render();
        

    });
})


