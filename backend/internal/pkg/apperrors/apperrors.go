package apperrors

type Code string

const (
	NotFound         Code = "not_found"
	MethodNotAllowed Code = "method_not_allowed"
	Internal         Code = "internal"
)

var messages = map[Code]string{
	NotFound:         "resource not found",
	MethodNotAllowed: "method not allowed",
	Internal:         "internal server error",
}

func (c Code) Message() string {
	return messages[c]
}
