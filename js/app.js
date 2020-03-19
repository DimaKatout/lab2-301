'use strict'
var all =[];
function Hornes(data){
    this.image_url=data.image_url;
    this.title=data.title;
    this.description=data.description;
    this.keyword=data.keyword;
    this.horns=data.horns;
    all.push(this);

}

Hornes.prototype.render=function(){
let hornesClone=$(`.photo-template`).clone();
hornesClone.removeClass('photo-template');
hornesClone.find('img').attr('src', this.image_url);
hornesClone.find('h2').text(this.title);
hornesClone.find('p').text(this.description);
hornesClone.find('h4').text(this.keyword);
hornesClone.find('h5').text(this.hornes);
$('main').append(hornesClone);


}

Hornes.prototype.selection=function(){

let selectionClone=$('select').clone();
//selectionClone.removeClass
selectionClone.find('option').text(this.keyword);
$('header').append(selectionClone);

}

$.get('./data/page-1.json')
.then(data =>{
    data.forEach((value,index )=> {
        let hornes=new Hornes(value);
hornes.render();
//hornes.selection();
hornes.filter();
hornes.handleFunc();

    })
    //.then(Hornes.filter)
    //.then(Image.handleFilter);
})



/*Hornes.prototype.filter = function() {
    let keys = [];
  
   // $('option').not(':first').remove();
  
   

    for(var i=0;i<all.length;i++)
    {
      if (!keys.includes(Hornes.keyword)) 
      keys.push(Hornes.keyword);
    }
  
    keys.sort();
  
    keys.forEach(keyword => {
      let tag = `<option value="${this.keyword}">${this.keyword}</option>`;
      $('select').append(tag);
    });
  };*/
Hornes.prototype.filter = function() {
    let filterKeywords = [];
  
    $('option').not(':first').remove();
  
    all.forEach(image => {
      if (!filterKeywords.includes(image.keyword)) filterKeywords.push(image.keyword);
    });
  
    filterKeywords.sort();
  
    filterKeywords.forEach(keyword => {
      let optionTag = `<option value="${keyword}">${keyword}</option>`;
      $('select').append(optionTag);
    });
  };



  Hornes.prototype.handleFunc = function() {
    $('select').on('change', function () {
        let $selected = $(this).val();
        if ($selected !== 'default') {
          $('div').hide();
    
          all.forEach(image => {
            if ($selected === image.keyword) {
              $(`div[class="${$selected}"]`).addClass('filtered').fadeIn();
            }
          });
    
          $(`option[value=${$selected}]`).fadeIn();
        } else {
          $('div').removeClass('filtered').fadeIn();
          $(`option[value=${$selected}]`).fadeIn();
        }
      });
    };
    