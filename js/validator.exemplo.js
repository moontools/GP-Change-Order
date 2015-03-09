$(document).ready(function() {
	
	

	addValidatorListener('etapa');
	
	$('#form-change-order').bootstrapValidator({
			feedbackIcons: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			fields: {
				etapa: {
					validators: {
						notEmpty: {
							message: 'Selecione uma etapa'
						},
					}
				},
				empreendimento: {
					validators: {
						notEmpty: {
							message: 'Selecione um empreendimento'
						},
					}
				},
				justificativa: {
					validators: {
						notEmpty: {
							message: 'Insira uma justificativa'
						},
					}
				}
				
			}
	});	
		
});

function addValidatorListener(id){
	$('#'+id).change(function(){
		$('#form-change-order').bootstrapValidator('revalidateField', id);
	});
	$('#'+id).keyup(function(){
		$('#form-change-order').bootstrapValidator('revalidateField', id);
	});
}