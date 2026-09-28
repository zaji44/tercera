
function calcularDescuento(monto, porcentaje) {
    let descuento = monto * (porcentaje / 100);
    return monto - descuento;
}


const calcularInteresCuotas = (monto, cantidadCuotas) => {
    let tasaInteres = 0;
    if (cantidadCuotas === 3) tasaInteres = 0.10;      // 10% de recargo
    else if (cantidadCuotas === 6) tasaInteres = 0.20; // 20% de recargo
    else if (cantidadCuotas === 12) tasaInteres = 0.35;// 35% de recargo

    return monto + (monto * tasaInteres);
};


const mostrarResumenCompra = function(producto, totalBase, totalFinal, cuotas) {
    let valorCuota = totalFinal / cuotas;

    let mensaje = `=== RESUMEN DE TU COTIZACIÓN ===\n` +
                `Producto: ${producto}\n` +
                `Precio Subtotal: $${totalBase.toFixed(2)}\n` +
                `Total a pagar (${cuotas} cuotas): $${totalFinal.toFixed(2)}\n` +
                `Valor de cada cuota: $${valorCuota.toFixed(2)}`;

    
    alert(mensaje);

    // Salida por consola para registro de auditoría
    console.log("--- REGISTRO DEL SIMULADOR ---");
    console.log(`Producto seleccionado: ${producto}`);
    console.log(`Monto base: $${totalBase}`);
    console.log(`Monto final con intereses: $${totalFinal}`);
    console.log(`Cuotas: ${cuotas} de $${valorCuota.toFixed(2)}`);
};



function iniciarSimulador() {
    alert("¡Bienvenido al simulador de cotización de compras!");

    let continuar = true;

    while (continuar) {
        // ENTRADA DE DATOS
        let producto = prompt("Ingresa el nombre del producto que deseas cotizar:");
        
        let precio = parseFloat(prompt(`Ingresa el precio base de "${producto}":`));
        while (isNaN(precio) || precio <= 0) {
            precio = parseFloat(prompt("Por favor, ingresa un precio válido (número mayor a 0):"));
        }

        // Selección de descuento
        let tieneCupón = prompt("¿Tienes un cupón de descuento? (responder 'si' o 'no')").toLowerCase();
        let precioConDescuento = precio;

        if (tieneCupón === "si" || tieneCupón === "s") {
            let porcentaje = parseFloat(prompt("Ingresa el porcentaje de descuento (ejemplo: 10, 15, 20):"));
            if (!isNaN(porcentaje) && porcentaje > 0) {
                
                precioConDescuento = calcularDescuento(precio, porcentaje);
                alert(`¡Cupón aplicado! El nuevo subtotal es: $${precioConDescuento}`);
            } else {
                alert("Porcentaje no válido. Se mantendrá el precio original.");
            }
        }

        // Selección de cuotas
        let cuotas = parseInt(prompt("¿En cuántas cuotas deseas pagar? (1, 3, 6 o 12):"));
        while (![1, 3, 6, 12].includes(cuotas)) {
            cuotas = parseInt(prompt("Opción de cuotas inválida. Elige entre 1, 3, 6 o 12 cuotas:"));
        }

        // PROCESAMIENTO
        let totalFinal = precioConDescuento;
        if (cuotas > 1) {
            // Invocación de Función 2 (Función Flecha: calcularInteresCuotas)
            totalFinal = calcularInteresCuotas(precioConDescuento, cuotas);
        }

        // SALIDA DE DATOS
        
        mostrarResumenCompra(producto, precioConDescuento, totalFinal, cuotas);

        // Control del ciclo principal
        let respuestaSeguir = prompt("¿Deseas realizar otra cotización? (responder 'si' o 'no')").toLowerCase();
        if (respuestaSeguir !== "si" && respuestaSeguir !== "s") {
            continuar = false;
        }
    }

    alert("Gracias por utilizar el simulador. ¡Hasta pronto!");
}

iniciarSimulador();