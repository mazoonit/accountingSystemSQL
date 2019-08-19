//jquery toggle top bar

$(document).ready(function(){
	$(".y").click(function(){
		var id=$(this).attr("id");
		id=id.split('-');
		$("#content-"+id[0]+" section").hide();
		$(this).removeClass("unactive").siblings().addClass("unactive");
		$("#content-"+id[0]+" #"+id[1]).fadeIn(1000);
	});
	//date now for every input
	$('.date').val(new Date().toISOString().substr(0, 10));
	var d = new Date(),
	h = d.getHours(),
	m = d.getMinutes();
	if(h < 10) h = '0' + h;
	if(m < 10) m = '0' + m;
	$('input[type="time"][value="now"]').each(function(){
		$(this).attr({'value': h + ':' + m});
	});

});
