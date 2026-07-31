# 🏠 RoomCreator

RoomCreator is an intelligent web application that converts natural language room requirements into editable 2D floor plan layouts. Users can describe their desired home in plain English, and the application extracts room requirements using rule-based parsing to generate an interactive blueprint.

---

## Features

- 📝 Natural language room requirement input
- 🏡 Automatic room requirement extraction
- 📐 2D blueprint generation
- ✏️ Interactive blueprint editing
- 💾 Save and manage generated blueprints
- 📱 Responsive user interface

---

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Supabase

### Algorithms
- Rule-based Natural Language Parsing (Regular Expressions)
- Blueprint Layout Generation
- Canvas Rendering

---

## Project Workflow

```
User Input
     │
     ▼
Natural Language Parser
     │
     ▼
Structured Room Requirements
     │
     ▼
Blueprint Generation Algorithm
     │
     ▼
Interactive 2D Floor Plan
```

---

## Example Input

```
I need a house with two bedrooms, one kitchen,
one bathroom, a living room and a dining room.
The plot size is 40 x 50.
```

---

## Generated Output

- 2 Bedrooms
- 1 Kitchen
- 1 Bathroom
- Living Room
- Dining Room
- Editable 2D Blueprint

---

## Project Structure

```
src/
│
├── components/
├── pages/
├── services/
├── hooks/
├── ui/
├── lib/
└── integrations/
```

---

## Future Enhancements

- AI/LLM-powered natural language understanding
- Furniture placement
- Cost estimation
- 3D visualization
- Multi-floor support
- Vastu/Feng Shui recommendations

---

## Installation

```bash
git clone https://github.com/NithishAK31/roomcreator.git

cd roomcreator

npm install

npm run dev
```

---

## Author

**Nithish AK**

B.Tech CSE (Data Science)

SRM University

GitHub: https://github.com/NithishAK31
