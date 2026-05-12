    //CUENTA ATRÁS 
    const fechaBoda = new Date('2026-10-23T18:30:00');

    function actualizarCuentaAtras() {
      const ahora = new Date();
      const diff  = fechaBoda - ahora;

      if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<p class="ya-es-hoy">¡Hoy es el gran día!</p>';
        return;
      }

      const dias  = Math.floor(diff / 86400000);
      const horas = Math.floor((diff % 86400000) / 3600000);
      const min   = Math.floor((diff % 3600000)  / 60000);
      const seg   = Math.floor((diff % 60000)    / 1000);

      document.getElementById('cd-dias').textContent  = dias;
      document.getElementById('cd-horas').textContent = String(horas).padStart(2, '0');
      document.getElementById('cd-min').textContent   = String(min).padStart(2, '0');
      document.getElementById('cd-seg').textContent   = String(seg).padStart(2, '0');
    }

    actualizarCuentaAtras();
    setInterval(actualizarCuentaAtras, 1000);

 // ─── FORMULARIO RSVP ──────────────────────────
    // Feedback visual al enviar sin recargar la página
    const form       = document.getElementById('rsvp-form');
    const resultado  = document.getElementById('form-resultado');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando...';
      btn.disabled    = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body:   new FormData(form),
        });

        const data = await res.json();

        if (data.success) {
          form.reset();
          resultado.style.display = 'block';
          resultado.innerHTML     = '<p class="exito">¡Recibido! Muchas gracias 🎉</p>';
        } else {
          throw new Error('Error en el envío');
        }
      } catch {
        resultado.style.display = 'block';
        resultado.innerHTML     = '<p class="error">Algo salió mal. Inténtalo de nuevo o escríbenos directamente.</p>';
        btn.textContent = 'Confirmar asistencia';
        btn.disabled    = false;
      }
    });


    
