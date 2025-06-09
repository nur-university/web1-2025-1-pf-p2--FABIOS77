document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ JS de registro cargado correctamente");
  
    const form = document.getElementById("form-registro");
  
    if (!form) {
      console.error("❌ No se encontró el formulario con id 'form-registro'");
      return;
    }
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      console.log("📨 Formulario enviado");
  
      limpiarErrores();
  
      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();
  
      console.log("📦 Datos capturados:", { nombre, correo, contrasena });
  
      let valido = true;
  
      if (nombre === "") {
        mostrarError("nombre", "Ingrese su nombre");
        valido = false;
      }
  
      if (!correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        mostrarError("correo", "Correo no válido");
        valido = false;
      }
  
      if (contrasena.length < 6) {
        mostrarError("contrasena", "La contraseña debe tener al menos 6 caracteres");
        valido = false;
      }
  
      if (!valido) {
        console.warn("⚠️ Validación fallida, no se enviará el formulario");
        return;
      }
  
      try {
        console.log("🔁 Enviando datos al backend...");
  
        const res = await fetch("http://localhost:8000/api/registro", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, correo, contrasena })
        });
  
        const data = await res.json();
        console.log("📥 Respuesta del backend:", data);
  
        if (data.status === "ok") {
          form.reset();
          mostrarMensajeExito("Usuario registrado exitosamente");
  
          setTimeout(() => {
            
            window.location.href = "login.html";
          }, 2000);
        } else {
          console.warn("❌ Error del backend:", data.mensaje);
          mostrarError("correo", data.mensaje);
        }
      } catch (err) {
        console.error("💥 Error de red/fetch:", err);
        mostrarError("correo", "Error de conexión con el servidor");
      }
    });
  
    function mostrarError(campo, mensaje) {
      const span = document.getElementById(`error-${campo}`);
      if (span) {
        span.textContent = mensaje;
        span.style.display = "block";
      }
    }
  
    function limpiarErrores() {
      document.querySelectorAll(".error-msg").forEach(e => {
        e.textContent = "";
        e.style.display = "none";
      });
      const div = document.getElementById("mensaje-exito");
      if (div) div.style.display = "none";
    }
  
    function mostrarMensajeExito(mensaje) {
      const div = document.getElementById("mensaje-exito");
      if (div) {
        div.textContent = mensaje;
        div.style.display = "block";
      }
    }
  });
  