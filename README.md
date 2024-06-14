# **LinkTIC Test Backend Project**

![Badge en Test Service](https://img.shields.io/badge/STATUS-Servidor%20de%20Pruebas-red)
![Badge en Test Service](https://img.shields.io/badge/STATUS-Pruebas%20Produccion-red)  
![example branch parameter](https://github.com/github/docs/actions/workflows/main.yml/badge.svg?branch=feature-1)

[INSERTE UNA DESCRIPCION DEL SERVICIO Y LO QUE HACE]

| Version | Descripcion         | Estado     |
| ------- | ------------------- | ---------- |
| 1.0.0   | Integracion inicial | Desarrollo |
|         |                     |            |

## **NOTAS PARA RELEASE** :

[INSERTE TAREAS PENDIENTES , O ANOTACIONES IMPORTANTES A TENER EN CUENTA CON EL SERVICIO]

## **SERVICIOS/END POINTS**

- Puerto PROD = 18896
- Puerto QA = 28896

Rutas :

| Servicio        | Metodo | URL        | LOCAL TEST | QA SERVER TEST |
| --------------- | ------ | ---------- | ---------- | -------------- |
| Test service up | GET    | /api/test  | ⛔         | ⛔             |
| SERV1           | POST   | /api/SERV1 | ⛔         | ⛔             |
| SERV2           | POST   | /api/SERV2 | ⛔         | ⛔             |

## **ENUMERACION DE SERVICIOS PARA FLOW**

La siguiente tabla muestra el "serviceId" para el consumo de los servicios mediante la plataofrma FLOW.

| Servicio | QA  | PRODUCCION | PRODUCCION 2 |
| -------- | --- | ---------- | ------------ |
| SERV1    | ⛔  | ⛔         | ⛔           |
| SERV2    | ⛔  | ⛔         | ⛔           |

## _ESTRUCTURA ESPERADA DE RESPUESTA DEL SERVICIO_

```json
{
  "code": "NUM",
  "message": "aaaa"
}
```

## _ESTRUCTURA DE ERROR DEL SERVICIO_

```json
{
  "code": "NUM",
  "error": "ERROR MESSAGE"
}
```
