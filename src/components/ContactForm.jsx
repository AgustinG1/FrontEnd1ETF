import { useState } from 'react';
import { validateContact } from '../utils/validation.js';

const empty = { nombre: '', email: '', mensaje: '' };
export default function ContactForm() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  function change(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
    setErrors({ ...errors, [event.target.name]: '' });
    setSuccess(false);
  }
  function submit(event) {
    event.preventDefault();
    const problems = validateContact(values);
    setErrors(problems);
    setSuccess(false);
    if (Object.keys(problems).length) { event.currentTarget.elements[Object.keys(problems)[0]].focus(); return; }
    setSuccess(true);
    setValues(empty);
  }
  return (
    <section id="contacto" className="contact-section" aria-labelledby="titulo-contacto">
      <div className="row g-5">
        <div className="col-lg-5"><p className="eyebrow">CONTACTO</p><h2 id="titulo-contacto">¿Tienes alguna<br /><span className="text-acento">pregunta?</span></h2><p className="text-muted">Completa el formulario para comprobar tus datos y contarnos lo que necesitas.</p><p className="small text-muted">Formulario demostrativo: valida la información localmente; no envía correos ni guarda datos personales.</p></div>
        <div className="col-lg-7">
          <form onSubmit={submit} noValidate>
            <div className="row g-3">
              {[{ name: 'nombre', label: 'Nombre', placeholder: 'Nombre', type: 'text', autoComplete: 'name', max: 80 }, { name: 'email', label: 'Email', placeholder: 'email@mail.cl', type: 'email', autoComplete: 'email', max: 120 }].map((field) => <div className="col-md-6" key={field.name}><label className="form-label" htmlFor={`contacto-${field.name}`}>{field.label}</label><input id={`contacto-${field.name}`} name={field.name} type={field.type} placeholder={field.placeholder} autoComplete={field.autoComplete} maxLength={field.max} required className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`} value={values[field.name]} onChange={change} aria-invalid={Boolean(errors[field.name])} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} />{errors[field.name] && <p id={`error-${field.name}`} className="invalid-feedback" role="alert">{errors[field.name]}</p>}</div>)}
              <div className="col-12"><label className="form-label" htmlFor="contacto-mensaje">Mensaje</label><textarea id="contacto-mensaje" name="mensaje" rows="4" maxLength={1000} required className={`form-control ${errors.mensaje ? 'is-invalid' : ''}`} value={values.mensaje} onChange={change} aria-invalid={Boolean(errors.mensaje)} aria-describedby={errors.mensaje ? 'error-mensaje' : undefined} />{errors.mensaje && <p id="error-mensaje" className="invalid-feedback" role="alert">{errors.mensaje}</p>}</div>
            </div>
            <button className="btn btn-pcgames mt-3" type="submit">Enviar mensaje</button>
            {success && <p className="alert alert-success mt-3 mb-0" role="status">Datos validados correctamente. El envío es una simulación; no se ha enviado ningún correo.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}
