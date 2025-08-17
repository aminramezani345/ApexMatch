{
  "name": "Match",
  "type": "object",
  "properties": {
    "candidate_id": {
      "type": "string"
    },
    "role_id": {
      "type": "string"
    },
    "match_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    },
    "match_explanation": {
      "type": "string"
    },
    "strengths": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "gaps": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "competency_alignment": {
      "type": "object",
      "properties": {
        "strategic_planning": {
          "type": "number"
        },
        "team_leadership": {
          "type": "number"
        },
        "financial_acumen": {
          "type": "number"
        },
        "market_knowledge": {
          "type": "number"
        },
        "innovation": {
          "type": "number"
        },
        "execution": {
          "type": "number"
        }
      }
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "shortlisted",
        "interviewed",
        "rejected",
        "hired"
      ],
      "default": "pending"
    }
  },
  "required": []
}