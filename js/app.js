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
  /*
  //importantttttttttttt
  //create an empty div tag
  let hornesClone=$('<div></div>')
  hornesClone.addClass(this.keyword);



  //hay it reads what inside the photo template
  //it adds the template to the output div
  hornesClone.html('photo-template').html();

  //put the data on
hornesClone.find('h2').text(this.title);
hornesClone.find('img').attr('src', this.image_url);
hornesClone.find('p').text(this.description);





  hornesOutput.html('<span>hi</span>')
  $(main).append(hornesOutput)
  */
let hornesClone=$(`.photo-template`).clone();
hornesClone.removeClass('photo-template');
hornesClone.find('img').attr('src', this.image_url);
hornesClone.find('h2').text(this.title);
hornesClone.find('p').text(this.description);
hornesClone.find('h4').text(this.keyword);
hornesClone.find('h5').text(this.hornes);
$('main').append(hornesClone);

//clone(copy) the photo template
//add that copy to the page
//in the copy put that data into the markup

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


 /* Hornes.prototype.populate=function(){
//bedoon had ra7 yseer feeh tekrar
let seen={};

    all.forEach((horn) =>{
      if (!seen[horn.keyword]){
        let option=`<option value="$(horn.keyword)">
        $(horn.keyword)</option>`
        $('select').append(option);

      //console.log(horn.keyword)
        seen[horn.keyword]=true;}
      
     

    }
  )}*/
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

//badal eli foo2
$().on('change',function(){
  let selected=$(this).val();
  $('div').hide();
  $(`.${selected}`.fadeIn(800))
});
    