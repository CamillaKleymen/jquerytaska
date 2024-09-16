$(document).ready(function() {

    $('#convert').click(function() {
        var usdAmount = parseFloat($('#usd').val());

        if (!isNaN(usdAmount)) {
           
            $.getJSON('https://cbu.uz/ru/arkhiv-kursov-valyut/json/', function(data) {

                var usdToUzsRate = data.find(currency => currency.Ccy === 'USD').Rate;
                
                var uzsAmount = (usdAmount * usdToUzsRate).toFixed(2);
                
                $('#result').text('Сумма в UZS: ' + uzsAmount);
            });
        } else {
            $('#result').text('Пожалуйста, попробуйте позже.');
        }
    });
});