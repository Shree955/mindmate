import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const meditationPrograms = [
  {
    id: "mindful_breathing",
    name: "Mindful Breathing",
    description:
      "Become aware of your breath and return to the present moment. Great for reducing anxiety and calming the mind.",
    steps: [
      {
        title: "Settle In",
        instruction:
          "Sit or lie down comfortably. Gently close your eyes or soften your gaze. Let your hands rest softly.",
        imageUrl:
          "https://images.unsplash.com/photo-1544837330-22120023c914?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Tune Into Your Breath",
        instruction:
          "Notice your breath as it moves in and out. Don’t force it, just observe. Notice the rise and fall of your chest.",
        imageUrl: "https://i.giphy.com/media/l0O6R3E4c0q3G4yV2/giphy.gif",
      },
      {
        title: "Count Each Breath",
        instruction:
          "If helpful, count each inhale and exhale up to ten, then start again. Let any distracting thoughts pass by.",
        imageUrl:
          "https://images.unsplash.com/photo-1506543085732-475267b165b4?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Return Gently",
        instruction:
          "Whenever your attention wanders, kindly bring it back to your breath. Continue for a few minutes.",
        imageUrl:
          "https://images.unsplash.com/photo-1616429215886-224424683a3f?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Finish Mindfully",
        instruction:
          "Wiggle your fingers or toes, slowly open your eyes. Notice how you feel. Carry this calm into your next activity.",
        imageUrl:
          "https://images.unsplash.com/photo-1518042469446-2401f891b920?q=80&w=1770&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "loving_kindness",
    name: "Loving-Kindness Meditation (Metta)",
    description:
      "Cultivate feelings of warmth and goodwill towards yourself and others to foster compassion and inner peace.",
    steps: [
      {
        title: "Begin with Yourself",
        instruction:
          "Bring your attention inward. Recite phrases silently: 'May I be happy. May I be healthy. May I be free from suffering.'",
        imageUrl:
          "https://images.unsplash.com/photo-1518042469446-2401f891b920?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "A Loved One",
        instruction:
          "Visualize a person you love. Gently repeat the phrases for them: 'May you be happy. May you be healthy. May you be free from suffering.'",
        imageUrl:
          "https://images.unsplash.com/photo-1517454238547-5a2a2979247d?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "A Neutral Person",
        instruction:
          "Bring to mind someone you feel neutral about, perhaps an acquaintance. Extend the same wishes to them: 'May you be happy. May you be healthy. May you be free from suffering.'",
        imageUrl:
          "https://images.unsplash.com/photo-1557005436-54523c10a30b?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "A Difficult Person",
        instruction:
          "Now, think of someone with whom you have a difficult relationship. Offer the phrases with as much sincerity as you can: 'May you be happy. May you be healthy. May you be free from suffering.'",
        imageUrl:
          "https://images.unsplash.com/photo-1606553556950-8919641739c3?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "All Beings",
        instruction:
          "Finally, expand your awareness to all living beings everywhere. Silently wish: 'May all beings be happy. May all beings be healthy. May all beings be free from suffering.'",
        imageUrl:
          "https://images.unsplash.com/photo-1520627581781-b5168e37d5ec?q=80&w=1770&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "body_scan",
    name: "Body Scan Relaxation",
    description:
      "Relax your body progressively from head to toe. A practice for stress relief and deep calm.",
    steps: [
      {
        title: "Get Comfortable",
        instruction:
          "Lie down or sit in a restful position. Allow your hands to rest on your stomach or by your sides.",
        imageUrl:
          "https://images.unsplash.com/photo-1518042469446-2401f891b920?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Notice Your Head",
        instruction:
          "Bring gentle attention to your head and face. Soften your forehead and jaw. Let any tension release.",
        imageUrl:
          "https://images.unsplash.com/photo-1524177514330-1a76c6c4c549?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Scan Down Your Body",
        instruction:
          "Move your attention slowly down through your neck, shoulders, arms, chest, and belly. Soften each part.",
        imageUrl:
          "https://images.unsplash.com/photo-1620188523317-023a10271542?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Reach Your Feet",
        instruction:
          "Bring gentle focus to your legs, calves, ankles, and feet. Notice any sensation; invite relaxation.",
        imageUrl:
          "https://images.unsplash.com/photo-1562967691-631c81c63390?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Complete and Reflect",
        instruction:
          "Wiggle your toes and fingers. When ready, open your eyes and notice your state of body and mind.",
        imageUrl:
          "https://images.unsplash.com/photo-1516246820792-bf39369f03d6?q=80&w=1770&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "walking_meditation",
    name: "Walking Meditation",
    description:
      "Mindful walking to ground yourself and become aware of each step you take. Ideal for bringing mindfulness into daily life.",
    steps: [
      {
        title: "Start Walking Slowly",
        instruction:
          "Find a quiet path and begin to walk at a comfortable pace. Let your hands rest at your sides or in front of you.",
        imageUrl:
          "https://images.unsplash.com/photo-1518042469446-2401f891b920?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Notice Each Step",
        instruction:
          "Pay close attention to the sensation of your foot making contact with the ground. Notice the lift, the movement, and the placement.",
        imageUrl:
          "https://images.unsplash.com/photo-1528659550346-a49622d9b626?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Synchronize Breath with Steps",
        instruction:
          "If it feels natural, coordinate your breath with your steps. For example, inhale for three steps, then exhale for three steps.",
        imageUrl:
          "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2ZnbGpyb2Z2cTF4N2dmaHI1cDNkMm96aWk3MXB6a3N1MnI1bHJ4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0O6R3E4c0q3G4yV2/giphy.gif",
      },
      {
        title: "Tune into Sounds and Scents",
        instruction:
          "As you walk, notice the sounds around you—birds, wind, cars—without getting caught up in them. Pay attention to any scents in the air.",
        imageUrl:
          "https://images.unsplash.com/photo-1518042469446-2401f891b920?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Complete the Walk Mindfully",
        instruction:
          "As you finish, pause for a moment. Notice the sense of calm and presence you have cultivated through movement.",
        imageUrl:
          "https://images.unsplash.com/photo-1627764726207-6f8d39f28a6f?q=80&w=1770&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "gratitude_meditation",
    name: "Gratitude Meditation",
    description:
      "Cultivate a sense of appreciation for what you have and foster positivity.",
    steps: [
      {
        title: "Bring to Mind Your Blessings",
        instruction:
          "Close your eyes and think about people, moments, or things you are grateful for.",
        imageUrl:
          "https://images.unsplash.com/photo-1517454238547-5a2a2979247d?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Feel the Gratitude",
        instruction:
          "Focus on the warmth in your heart as you cherish these blessings.",
        imageUrl:
          "https://images.unsplash.com/photo-1594799059535-43a910165922?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Expand Your Gratitude",
        instruction:
          "Extend this feeling of thankfulness beyond yourself to the wider world.",
        imageUrl:
          "https://images.unsplash.com/photo-1557005436-54523c10a30b?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Express Gratitude",
        instruction:
          "Consider writing a note or silently thanking those who have positively impacted your life.",
        imageUrl:
          "https://images.unsplash.com/photo-1606553556950-8919641739c3?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Conclude",
        instruction:
          "Open your eyes gently and carry the gratitude with you throughout your day.",
        imageUrl:
          "https://images.unsplash.com/photo-1520627581781-b5168e37d5ec?q=80&w=1770&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "body_awareness",
    name: "Body Awareness Meditation",
    description:
      "Improve your connection with your body to ease tension and enhance mindfulness.",
    steps: [
      {
        title: "Sit Comfortably",
        instruction:
          "Sit upright with your feet on the floor and hands resting on your lap.",
        imageUrl:
          "https://images.unsplash.com/photo-1518042469446-2401f891b920?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Check Your Posture",
        instruction:
          "Feel the alignment of your spine and release any tightness in your muscles.",
        imageUrl:
          "https://images.unsplash.com/photo-1524177514330-1a76c6c4c549?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Scan Your Body",
        instruction:
          "Slowly notice sensations in each part of your body from head to toe.",
        imageUrl:
          "https://images.unsplash.com/photo-1620188523317-023a10271542?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Release Tension",
        instruction:
          "Breathe into areas of tightness and imagine the tension melting away.",
        imageUrl:
          "https://images.unsplash.com/photo-1562967691-631c81c63390?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "End with Awareness",
        instruction:
          "Open your eyes when ready, carrying a sense of calm and body awareness.",
        imageUrl:
          "https://images.unsplash.com/photo-1516246820792-bf39369f03d6?q=80&w=1770&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "stress_relief",
    name: "Stress Relief Meditation",
    description:
      "Release stress and cultivate relaxation with focused breathing and mindfulness.",
    steps: [
      {
        title: "Find Your Seat",
        instruction:
          "Sit comfortably with both feet flat on the ground and your hands on your lap.",
        imageUrl:
          "https://images.unsplash.com/photo-1518042469446-2401f891b920?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Deep Breathing",
        instruction:
          "Take slow deep breaths in through your nose and out from your mouth, focusing on the breath.",
        imageUrl:
          "https://images.unsplash.com/photo-1544837330-22120023c914?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Body Relaxation",
        instruction:
          "Progressively relax parts of your body starting from your feet up to your head.",
        imageUrl:
          "https://images.unsplash.com/photo-1620188523317-023a10271542?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Release Tension",
        instruction: "Visualize tension flowing away with each exhale.",
        imageUrl:
          "https://images.unsplash.com/photo-1524177514330-1a76c6c4c549?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Open Your Eyes",
        instruction:
          "When ready, slowly open your eyes and notice the relief in your body.",
        imageUrl:
          "https://images.unsplash.com/photo-1516246820792-bf39369f03d6?q=80&w=1770&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "concentration_meditation",
    name: "Concentration Meditation",
    description:
      "A practice to sharpen your focus and reduce mental clutter by directing your attention to a single object.",
    steps: [
      {
        title: "Choose an Object",
        instruction:
          "Select a point of focus. This could be your breath, a mantra, a candle flame, or a specific sensation in your body.",
        imageUrl:
          "https://images.unsplash.com/photo-1601758228022-ee0c42767073?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Fix Your Gaze",
        instruction:
          "Fix your gaze on the object. If your mind wanders, gently bring it back to your chosen object without judgment.",
        imageUrl:
          "https://images.unsplash.com/photo-1581561578351-e945c928491c?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Observe with Detail",
        instruction:
          "Notice the subtle details of your object. If it's your breath, notice the temperature of the air. If a candle, notice the dance of the flame.",
        imageUrl:
          "https://images.unsplash.com/photo-1599395155949-a3597d3e0984?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Let Go of Distractions",
        instruction:
          "Thoughts and sensations will arise. Acknowledge them, and then calmly return your focus to your object.",
        imageUrl:
          "https://images.unsplash.com/photo-1516246820792-bf39369f03d6?q=80&w=1770&auto=format&fit=crop",
      },
      {
        title: "Conclude Mindfully",
        instruction:
          "After a few minutes, gently let go of the focus. Take a moment to sit quietly and notice the clarity you feel.",
        imageUrl:
          "https://images.unsplash.com/photo-1579737158498-f2b1c4355523?q=80&w=1770&auto=format&fit=crop",
      },
    ],
  },
];




export default function GuidedMeditation() {
  const [selectedId, setSelectedId] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useContext(AuthContext);

  const selectedProgram = meditationPrograms.find((m) => m.id === selectedId);

  // When no program is selected
  if (!selectedProgram) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl px-8 py-10">
          <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10">
            Guided Meditations
          </h1>
          <div className="grid gap-7 md:grid-cols-2">
            {meditationPrograms.map((program) => (
              <button
                key={program.id}
                onClick={() => {
                  setSelectedId(program.id);
                  setCurrentStep(0);
                }}
                className="flex flex-col justify-between p-7 h-full bg-violet-50 hover:bg-violet-200 rounded-2xl shadow-md transition text-left border-2 border-transparent hover:border-purple-400"
              >
                <span>
                  <h2 className="text-lg font-bold text-purple-900 mb-2">
                    {program.name}
                  </h2>
                  <p className="text-gray-700 mb-3">{program.description}</p>
                </span>
                <span className="block text-xs font-medium text-purple-400 mt-3">
                  {program.steps.length} steps
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const step = selectedProgram.steps[currentStep];
  const isLastStep = currentStep === selectedProgram.steps.length - 1;

  const handleNext = async () => {
    if (isLastStep) {
      try {
        // Call backend API to log meditation
        await fetch("http://localhost:5000/api/meditations/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user._id ,
            meditationId: selectedProgram.id,
          }),
        });

        alert("✅ Meditation logged successfully!");
        setCurrentStep(0);
        setSelectedId(null); // return to program list
      } catch (err) {
        console.error("Error logging meditation:", err);
        alert("❌ Failed to log meditation. Try again.");
      }
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-100 px-2 py-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl px-0 py-8">
        {/* Step progression bar */}
        <div className="flex justify-between items-center px-10 mb-6">
          <button
            onClick={() => setSelectedId(null)}
            className="text-purple-500 hover:text-purple-800 text-base font-semibold px-4 py-2 rounded-md bg-purple-50 hover:bg-purple-100 transition"
          >
            ← Meditations
          </button>
          <div className="flex items-center gap-4">
            {selectedProgram.steps.map((s, idx) => (
              <div
                key={s.title}
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold border-2 transition
                  ${
                    idx < currentStep
                      ? "bg-purple-400 border-purple-800 text-white"
                      : idx === currentStep
                      ? "bg-white border-purple-600 text-purple-800 ring-2 ring-purple-300"
                      : "bg-gray-200 border-gray-300 text-gray-500"
                  }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex flex-col md:flex-row gap-7 px-7 pb-4">
          <div className="md:w-1/2 flex-shrink-0">
            <img
              src={step.imageUrl}
              alt={step.title}
              className="w-full h-80 object-cover rounded-2xl shadow-xl"
            />
          </div>
          <div className="md:w-1/2 flex flex-col justify-center items-center text-center">
            <div className="mt-6 mb-3">
              <span className="inline-block bg-purple-100 text-purple-700 text-xs px-4 py-1 rounded-lg font-semibold mb-1">
                {selectedProgram.name}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
              {step.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed min-h-[80px]">
              {step.instruction}
            </p>
            <button
              onClick={handleNext}
              className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full shadow-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              {isLastStep ? "Finish & Log" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
