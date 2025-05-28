const form = document.getElementById('mediaForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);

    if (isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
  alert('Por favor, insira notas válidas entre 0 e 10.');
  return;
}

    const mediaFinal = ((nota1 + nota2) / 2).toFixed(2);
    const mediaNumber = parseFloat(mediaFinal);

    const value = document.getElementById('value');
    let description = '';


    document.getElementById('infos').classList.remove('hidden');

    if (mediaNumber >= 7) {
        description = 'Aprovado';
        value.classList.add('aproved');
        value.classList.remove('reproved');
    } else {
        description = 'Reprovado';
        value.classList.add('reproved');
        value.classList.remove('aproved');
    }

    value.textContent = mediaFinal.replace('.', ',');

    document.querySelector('#description span').textContent = description;


});