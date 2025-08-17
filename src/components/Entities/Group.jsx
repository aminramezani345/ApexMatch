{
  "name": "Group",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "type": {
      "type": "string",
      "enum": [
        "public",
        "private"
      ],
      "default": "public"
    },
    "category": {
      "type": "string",
      "enum": [
        "General",
        "Industry",
        "Role-specific",
        "Location",
        "Stage"
      ]
    },
    "member_count": {
      "type": "number",
      "default": 0
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": []
}