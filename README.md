# 3D Sequence Diagram

A modern React application that renders sequence diagrams in 3D using Three.js and React Three Fiber. This project provides an interactive and visually appealing way to display sequence diagrams with depth and perspective.

## Features

- 3D rendering of sequence diagram components
- Interactive camera controls for rotating and zooming
- Support for objects, messages, and lifelines
- Customizable colors and styles
- Dashed and solid message lines
- Multi-line text support for labels

## Technologies Used

- React 18
- TypeScript
- Three.js
- React Three Fiber (@react-three/fiber)
- React Three Drei (@react-three/drei)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/3d-sequence-diagram.git
cd 3d-sequence-diagram
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build:

```bash
npm run build
```

## Usage

The SequenceDiagram3D component allows you to create interactive 3D sequence diagrams. Key components include:

- Objects: Represent system components or actors
- Messages: Show communication between objects
- Lifelines: Represent the timeline of each object
- Interactive Controls: Orbit, pan, and zoom functionality
