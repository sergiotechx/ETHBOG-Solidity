**Programa final  para el curso Desarrollo parte II**

**Contratos:**

**ETHBOG.sol:  ( 0xAbBC523E3eBdB0Ed328631B1cDFfEb70f1eAe0bC)**

*   Token  erc-20 hecho con las librerias de openzeppelin
*   Maneja do por un un dueño que puede pausar el contrato
*   Se definen 6 decimales en el token
*   Se pueden genear más tokens

**TokenDistributor: (0x658cC355585590b4db1c2c96f28813c0E72f7a8c)**

*   Contrato que maneja una “especie” de  airdrop el cual sólo se puede reclamar 1 vez.
*   En cualquier momento el dueño del contrato puede retirar todas las monedas que subyacen en el contrato.

**Frontend https://ethbogsolidity-curso-parte-2.vercel.app/**

Realizado con NextJS 14.1.0

Como  libreria de conexión se usó Thidweb 5, esta por debajo maneja la libreria VIEM

**Instalación y puesta en ejecución**

*   _yarn install_
*   _yarn run dev_
