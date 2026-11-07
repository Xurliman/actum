package server

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/Xurliman/actum/backend/internal/apperrors"
)

type errorResponse struct {
	Error errorBody `json:"error"`
}

type errorBody struct {
	Code    apperrors.Code `json:"code"`
	Message string         `json:"message"`
}

func WriteJSON(w http.ResponseWriter, r *http.Request, status int, v any) {
	body, err := json.Marshal(v)
	if err != nil {
		slog.ErrorContext(r.Context(), "server: encode json", "error", err)
		WriteError(w, r, http.StatusInternalServerError, apperrors.Internal)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	// A failed write means the client went away; there is nothing left to do.
	_, _ = w.Write(body)
}

func WriteError(w http.ResponseWriter, r *http.Request, status int, code apperrors.Code) {
	WriteJSON(w, r, status, errorResponse{Error: errorBody{Code: code, Message: code.Message()}})
}
