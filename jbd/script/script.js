var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규표현식
function button_click(){
    var str = document.getElementById('userEmail')
    console.log(pattern.test(str.value))
    if(pattern.test(str.value)){
        $('.error').css('display','none')
        $('.error_text').css('display','none')
        $('input').css('border','1px solid hsl(0, 80%, 85%)')
    }else{
        $('.error').css('display','block')
        $('.error_text').css('display','block')
        $('input').css('border','2px solid hsl(0,93%, 68%)')
    }
}


