package data

import (
	"database/sql"
	"errors"
)

var (
	ErrNoRecordNotFound = errors.New("Record not found")
)

type Models struct {
	Movies MovieModel
}

func NewModles(db *sql.DB) Models {
	return Models{
		Movies: MovieModel{DB: db},
	}
}
