package main

import (
	_ "fmt"
	//_ "context"
	//_ "encoding/json"
	//_ "log"
	//_ "net"
	//_ "os"
	//_ "google.golang.org/grpc"
)

type Alumno struct {
	Carnet   int32  `json:"carnet"`
	Nombre   string `json:"nombre"`
	Curso    string `json:"curso"`
	Nota     int32  `json:"nota"`
	Semestre string `json:"semestre"`
	Anio     int32  `json:"anio"`
}
