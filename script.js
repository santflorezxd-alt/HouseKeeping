// Configura esto con tu URL personalizada
const tuScriptUrl = 'https://script.google.com/macros/s/AKfycbzeGu7jq5-bnsSvPtmezlwDIhwAnA60MMvu4IVUCqoDIf_o8WCzts50YeyIbtOt_UcB/exec';

// Función para enviar a Google Sheets
submitBtn.addEventListener('click', async () => {
  submitBtn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
  submitBtn.disabled = true;
  
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzeGu7jq5-bnsSvPtmezlwDIhwAnA60MMvu4IVUCqoDIf_o8WCzts50YeyIbtOt_UcB/exec';
  
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: JSON.stringify({
        date: new Date().toISOString(),
        tasks: completedTasks
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const result = await response.json();
    
    if(result.result === 'success') {
      // Mostrar confirmación
      confirmation.classList.add('show');
      
      // Reiniciar tareas después del envío
      setTimeout(() => {
        taskItems.forEach(item => item.classList.remove('completed'));
        completedTasks = [];
        updateProgress();
      }, 2000);
    } else {
      throw new Error('Error en el servidor');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error al enviar. Por favor intenta nuevamente.');
  } finally {
    submitBtn.innerHTML = 'Actualizar Hoja <i class="fas fa-paper-plane"></i>';
    submitBtn.disabled = false;
  }
});

// Agrupa tareas por área (opcional)
function agruparTareasPorArea(tareas) {
  const areas = {
    baño: [],
    cocina: [],
    salón: []
  };
  
  tareas.forEach(tarea => {
    if (tarea.includes('ducha') || tarea.includes('inodoro')) {
      areas.baño.push(tarea);
    } else if (tarea.includes('encimera') || tarea.includes('electrodomésticos')) {
      areas.cocina.push(tarea);
    } else {
      areas.salón.push(tarea);
    }
  });
  
  return areas;
}
