export const Role = {
  "name": "Role",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Role title"
    },
    "role_type": {
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
    "company_name": {
      "type": "string"
    },
    "industry": {
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
    },
    "stage": {
      "type": "string",
      "enum": [
        "Pre-seed",
        "Seed",
        "Series A",
        "Series B",
        "Series C+",
        "IPO Ready"
      ]
    },
    "location": {
      "type": "string"
    },
    "remote_ok": {
      "type": "boolean",
      "default": false
    },
    "compensation_min": {
      "type": "number"
    },
    "compensation_max": {
      "type": "number"
    },
    "equity_range": {
      "type": "string"
    },
    "key_requirements": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "kpis": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "metric": {
            "type": "string"
          },
          "target": {
            "type": "string"
          }
        }
      }
    },
    "required_competencies": {
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
    "availability": {
      "type": "string",
      "enum": [
        "Immediate",
        "1-2 months",
        "3-6 months",
        "6+ months"
      ]
    }
  },
  "required": []
};
