import { useState } from 'react'
import styles from './TerminosYCondiciones.module.css'
import Button from '../Buttons/Button/Button'

const TerminosYCondiciones = ({ onClick }) => {
  const [isChecked, setIsChecked] = useState(false)
  return (
    <div className={styles.container}>
      <div className={styles.containerTyC}>
        <h2 style={{ textAlign: 'center' }}>
          <strong>Términos y Condiciones de Uso</strong>
        </h2>
        <p className={styles.title}>&nbsp;</p>
        <p className={styles.title}>
          <strong>INFORMACIÓN RELEVANTE</strong>
        </p>
        <p className={styles.title}>
          Es requisito necesario para la adquisición de los productos que se
          ofrecen en este sitio, que lea y acepte los siguientes Términos y
          Condiciones que a continuación se redactan. El uso de nuestros
          servicios así como la compra de nuestros productos implicará que usted
          ha leído y aceptado los Términos y Condiciones de Uso en el presente
          documento. Todas los productos &nbsp;que son ofrecidos por nuestro
          sitio web pudieran ser creadas, cobradas, enviadas o presentadas por
          una página web tercera y en tal caso estarían sujetas a sus propios
          Términos y Condiciones. En algunos casos, para adquirir un producto,
          será necesario el registro por parte del usuario, con ingreso de datos
          personales fidedignos y definición de una contraseña.
        </p>
        <p className={styles.title}>
          El usuario puede elegir y cambiar la clave para su acceso de
          administración de la cuenta en cualquier momento, en caso de que se
          haya registrado y que sea necesario para la compra de alguno de
          nuestros productos. http://securityandsystem.com/ no asume la
          responsabilidad en caso de que entregue dicha clave a terceros.
        </p>
        <p className={styles.title}>
          Todas las compras y transacciones que se lleven a cabo por medio de
          este sitio web, están sujetas a un proceso de confirmación y
          verificación, el cual podría incluir la verificación del stock y
          disponibilidad de producto, validación de la forma de pago, validación
          de la factura (en caso de existir) y el cumplimiento de las
          condiciones requeridas por el medio de pago seleccionado. En algunos
          casos puede que se requiera una verificación por medio de correo
          electrónico.
        </p>
        <p className={styles.title}>
          Los precios de los productos ofrecidos en esta Tienda Online es válido
          solamente en las compras realizadas en este sitio web.
        </p>
        <p className={styles.title}>
          <strong>LICENCIA</strong>
        </p>
        <p className={styles.title}>
          Security and System&nbsp; a través de su sitio web concede una
          licencia para que los usuarios utilicen&nbsp; los productos que son
          vendidos en este sitio web de acuerdo a los Términos y Condiciones que
          se describen en este documento.
        </p>
        <p className={styles.title}>
          <strong>USO NO AUTORIZADO</strong>
        </p>
        <p className={styles.title}>
          En caso de que aplique (para venta de software, templetes, u otro
          producto de diseño y programación) usted no puede colocar uno de
          nuestros productos, modificado o sin modificar, en un CD, sitio web o
          ningún otro medio y ofrecerlos para la redistribución o la reventa de
          ningún tipo.
        </p>
        <p className={styles.title}>
          <strong>PROPIEDAD</strong>
        </p>
        <p className={styles.title}>
          Usted no puede declarar propiedad intelectual o exclusiva a ninguno de
          nuestros productos, modificado o sin modificar. Todos los productos
          son propiedad &nbsp;de los proveedores del contenido. En caso de que
          no se especifique lo contrario, nuestros productos se
          proporcionan&nbsp; sin ningún tipo de garantía, expresa o implícita.
          En ningún esta compañía será &nbsp;responsables de ningún daño
          incluyendo, pero no limitado a, daños directos, indirectos,
          especiales, fortuitos o consecuentes u otras pérdidas resultantes del
          uso o de la imposibilidad de utilizar nuestros productos.
        </p>
        <p className={styles.title}>
          <strong>POLÍTICA DE REEMBOLSO Y GARANTÍA</strong>
        </p>
        <p className={styles.title}>
          En el caso de productos que sean&nbsp; mercancías irrevocables
          no-tangibles, no realizamos reembolsos después de que se envíe el
          producto, usted tiene la responsabilidad de entender antes de
          comprarlo. &nbsp;Le pedimos que lea cuidadosamente antes de comprarlo.
          Hacemos solamente excepciones con esta regla cuando la descripción no
          se ajusta al producto. Hay algunos productos que pudieran tener
          garantía y posibilidad de reembolso pero este será especificado al
          comprar el producto. En tales casos la garantía solo cubrirá fallas de
          fábrica y sólo se hará efectiva cuando el producto se haya usado
          correctamente. La garantía no cubre averías o daños ocasionados por
          uso indebido. Los términos de la garantía están asociados a fallas de
          fabricación y funcionamiento en condiciones normales de los productos
          y sólo se harán efectivos estos términos si el equipo ha sido usado
          correctamente. Esto incluye:
        </p>
        <p className={styles.title}>
          – De acuerdo a las especificaciones técnicas indicadas para cada
          producto.
          <br />– En condiciones ambientales acorde con las especificaciones
          indicadas por el fabricante.
          <br />– En uso específico para la función con que fue diseñado de
          fábrica.
          <br />– En condiciones de operación eléctricas acorde con las
          especificaciones y tolerancias indicadas.
        </p>
        <p className={styles.title}>
          <strong>COMPROBACIÓN ANTIFRAUDE</strong>
        </p>
        <p className={styles.title}>
          La compra del cliente puede ser aplazada para la comprobación
          antifraude. También puede ser suspendida por más tiempo para una
          investigación más rigurosa, para evitar transacciones fraudulentas.
        </p>
        <p className={styles.title}>
          <strong>PRIVACIDAD</strong>
        </p>
        <p className={styles.title}>
          Este http://securityandsystem.com/ garantiza que la{' '}
          <a href='https://noticiasvalenciacf.es/' target='_blank'>
            valencia cf noticias
          </a>{' '}
          información personal que usted envía cuenta con la seguridad
          necesaria. Los datos ingresados por usuario o en el caso de requerir
          una validación de los pedidos no serán entregados a terceros, salvo
          que deba ser revelada en cumplimiento a una orden judicial o
          requerimientos legales.
        </p>
        <p className={styles.title}>
          La suscripción a boletines de correos electrónicos publicitarios es
          voluntaria y podría ser seleccionada al momento de crear su cuenta.
        </p>
        <p className={styles.title}>
          Security and System reserva los derechos de cambiar o de modificar
          estos términos sin previo aviso.
        </p>
      </div>
      <label htmlFor='aceptar_terminos' className={styles.labelCheckbox}>
        <input
          className={styles.inputCheckbox}
          type='checkbox'
          checked={isChecked}
          name='aceptar_terminos'
          id='aceptar_terminos'
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        Acepto terminos y condiciones
      </label>
      <Button text={'Crear cuenta'} func={onClick} disabled={!isChecked} />
    </div>
  )
}

export default TerminosYCondiciones
