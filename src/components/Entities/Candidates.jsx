{
  "name": "Candidate",
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string",
      "description": "First name"
    },
    "last_name": {
      "type": "string",
      "description": "Last name"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "phone": {
      "type": "string"
    },
    "cv_url": {
      "type": "string",
      "description": "URL to uploaded CV"
    },
    "target_roles": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "CEO",
          "CTO",
          "CFO",
          "COO",
          "CMO",
          "CPO",
          "CHRO"
        ]
      },
      "description": "Target C-level positions"
    },
    "industries": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "Technology",
          "Healthcare",
          "Finance",
          "Retail",
          "Manufacturing",
          "Education",
          "Energy",
          "Real Estate"
        ]
      }
    },
    "startup_stages": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "Pre-seed",
          "Seed",
          "Series A",
          "Series B",
          "Series C+",
          "IPO Ready"
        ]
      }
    },
    "competencies": {
      "type": "object",
      "properties": {
        "strategic_planning": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        },
        "team_leadership": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        },
        "financial_acumen": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        },
        "market_knowledge": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        },
        "innovation": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        },
        "execution": {
          "type": "number",
          "minimum": 1,
          "maximum": 10
        }
      }
    },
    "outcomes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "description": {
            "type": "string"
          },
          "metrics": {
            "type": "string"
          },
          "proof_url": {
            "type": "string"
          }
        }
      }
    },
    "readiness_score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100
    }
  },
  "required": []
}