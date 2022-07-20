import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render, find, waitFor, waitUntil} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ENV from 'super-rentals/config/environment';
module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  // Colocamos los parámetros que le pusimos a nuestro mapa
  test('it renders a map image for the specified parameters', async function (assert) {
    await render(hbs`<Map
    @x = "3"
    @y = "2"
    @z = "4" 
    @width = "150"
    @height = "150"
    />`);

    
    assert
    .dom('.map img')
    .exists()
    .hasAttribute('alt', 'Un mapa con sus coordenadas 3, 2, 4')
    .hasAttribute('src')
    .hasAttribute('width', '150')
    .hasAttribute('height', '150');
    
    let { src } = find('.map img'); //El find es un helper para encontrar elementos en el DOM
    await waitFor('[id="pruebatest"]');
    assert.ok(src, 'El elemento con ID "pruebatest" existe');
    await waitFor('img');
    assert.ok(src, 'Existe un elemento en el DOM que tiene la etiqueta IMG');
    //assert.dom('[id="pruebatest"]').exists({ count: 0 }); FALLA PORQUE HAY 1 ELEMENTO
    assert.dom('[id="pruebatest"]').exists({ count: 1 });
    
    /**
     *... Normalmente cuando tengas errores del tipo 'Cannot read properties of undefined' lo nromal es que esté fallando la asignación de esa variable, puedes ir debugeando de forma que
          utilizando el mismo console.log o el inspector del navegador (a tu parecer) puedas ir viendo el valor de la variable, normalmente si te da ese error mencionado es porque la variable
          src está como "undefined", un console.log(src) y vamos viendo como queda.    
    **/
 

    // Assertion de start con maptiles
    console.log(src)
    assert.ok(
      src.startsWith('https://maptiles.p.rapidapi.com/'),
      '===> TEST: The src was started with "https://maptiles.p.rapidapi.com"'
      );
      
    //Assertion de parámetros x, y, z
    assert.ok(
      src.includes('3'),
      '===> TEST (Parameters): The src should include the x, y, z parameters'
    );
    



  });
 
  /** ===================== U P D A T E    T E S T S =====================  **/

  //
  test('===> TEST [UPDATES]: It updates the `src` attribute when the arguments change', async function (assert) {
    this.setProperties({
      x: 5,
      y: 2,
      z: 4,
      width: 520,
      height: 520,
    });

    await render(hbs`<Map
      @x={{this.x}}
      @y={{this.y}}
      @z={{this.z}}
      @width={{this.width}}
      @height={{this.height}}
    />`);
    
    let img = find('.map img');

    assert.ok(
      img.src.includes('5'),
      'the src should include the x parameter'
    );
    
    assert.ok(
      img.src.includes('2'),
      'the src should include the y parameter'
    );
    await render(hbs`<h1>Hello World</h1>`);  
    
  });

  test('it shows the notification for the configured period of time', async function(assert) {
    render(hbs`<h1>Hello World</h1>`);
    await waitUntil(() => {
      let kapasao = true;
      if (kapasao) {
        kapasao = true;
        render(hbs`<h1>Hello true</h1>`);
      }else{
        kapasao = false;
        render(hbs`<h1>Goodbye false</h1>`);
      }

    });
    this.clock.tick(3000);
    assert.ok(labelIsVisible(), 'Message is shown when element is added');
 
    this.clock.tick(3000);
    assert.notOk(labelIsVisible(), 'The text is automatically hidden after timeout value.');
  });
});