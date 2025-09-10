import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

// PWM demonstration data generation function
const generatePWMData = (dutyCycle: number, frequency: number = 5) => {
  const data = [];
  const totalPoints = 100;
  const cycleLength = totalPoints / frequency;
  const highPoints = Math.round((dutyCycle / 100) * cycleLength);
  
  for (let i = 0; i < totalPoints; i++) {
    const cyclePosition = i % cycleLength;
    data.push({
      time: i,
      value: cyclePosition < highPoints ? 100 : 0
    });
  }
  
  return data;
};

// PWM application examples
const applicationExamples = [
  {
    title: "LED Brightness Control",
    description: "Phone flashlights use PWM to adjust brightness. By rapidly turning the LED on and off, our eyes perceive brightness changes rather than flickering.",
    imagePrompt: "LED%20light%20with%20brightness%20control%2C%20simple%20illustration%2C%20cartoon%20style"
  },
  {
    title: "Motor Speed Control",
    description: "Toy cars use PWM to control speed by changing the duty cycle of the electrical signal sent to the motor.",
    imagePrompt: "Toy%20car%20with%20speed%20control%2C%20simple%20illustration%2C%20cartoon%20style"
  },
  {
    title: "Audio Volume Control",
    description: "Modern audio equipment uses PWM for precise volume control, providing clearer sound quality and a wider volume range.",
    imagePrompt: "Audio%20speaker%20with%20volume%20control%2C%20simple%20illustration%2C%20cartoon%20style"
  }
];

export default function Home() {
  const [dutyCycle, setDutyCycle] = useState(50);
  const pwmData = generatePWMData(dutyCycle);
  
  // Calculate average voltage (simulates LED brightness)
  const averageValue = dutyCycle;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Page Header */}
      <header className="py-8 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">What is PWM?</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A Simple Explanation of Pulse Width Modulation for Middle School Students
        </p>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Introduction Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4 flex items-center">
            <i className="fa-solid fa-lightbulb mr-3 text-yellow-500"></i>What is PWM?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              PWM stands for "Pulse Width Modulation" – a technology that controls output by rapidly switching a circuit on and off.
            </p>
            <p className="text-lg mb-4">
              Imagine watering a plant: leaving the faucet fully open for 30 seconds delivers the same amount of water as turning it on for 0.3 seconds and off for 0.7 seconds, repeating this cycle for 100 seconds. PWM works like the second method!
            </p>
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-xl my-6">
              <p className="text-center font-medium text-blue-800 dark:text-blue-200">
                <strong>Simply put:</strong> PWM adjusts the average output by rapidly switching power on and off, controlling the ratio of "on" time to "off" time.
              </p>
            </div>
          </div>
        </section>
        
        {/* Demonstration Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 flex items-center">
            <i className="fa-solid fa-play-circle mr-3 text-green-500"></i>PWM Demonstration
          </h2>
          
          <div className="mb-8">
            <p className="text-lg mb-4">
              Drag the slider to change the <strong>duty cycle</strong> (percentage of time the power is on), and observe the PWM waveform and LED brightness changes:
            </p>
            
            {/* Duty Cycle Slider */}
            <div className="mb-6 px-4">
              <div className="flex justify-between mb-2">
                <label htmlFor="dutyCycle" className="text-gray-700 dark:text-gray-300 font-medium">
                  Duty Cycle: {dutyCycle}%
                </label>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {dutyCycle < 30 ? "Dim" : dutyCycle > 70 ? "Bright" : "Medium Brightness"}
                </span>
              </div>
              <input
                type="range"
                id="dutyCycle"
                min="0"
                max="100"
                value={dutyCycle}
                onChange={(e) => setDutyCycle(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
            
            {/* PWM Waveform Chart */}
            <div className="h-64 mb-8 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pwmData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Time', position: 'bottom', offset: 0, fontSize: 14 }}
                    stroke="#94a3b8"
                  />
                  <YAxis 
                    domain={[0, 100]} 
                    tick={{ fontSize: 12 }}
                    label={{ value: 'Voltage', angle: -90, position: 'left', offset: 0, fontSize: 14 }}
                    stroke="#94a3b8"
                  />
                  <Tooltip 
                    formatter={(value) => [value === 100 ? 'On' : 'Off', 'State']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* LED Brightness Demonstration */}
            <div className="flex flex-col items-center">
              <p className="text-lg mb-4 text-center">LED Brightness Effect:</p>
              <div className="relative w-32 h-32 mb-4">
                <div 
                  className="absolute inset-0 rounded-full bg-yellow-200 dark:bg-yellow-900 flex items-center justify-center"
                  style={{ 
                    boxShadow: `0 0 ${averageValue/2}px ${averageValue/5}px rgba(250, 204, 21, ${averageValue/100 + 0.2})`,
                    opacity: averageValue/100 + 0.1
                  }}
                >
                  <i 
                    className="fa-solid fa-lightbulb text-5xl text-yellow-400 dark:text-yellow-300"
                    style={{ 
                      filter: `brightness(${1 + averageValue/100})`,
                      textShadow: `0 0 ${averageValue/3}px rgba(250, 204, 21, ${averageValue/100})`
                    }}
                  ></i>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-center">
                Average Brightness: {averageValue}%
              </p>
            </div>
          </div>
        </section>
        
        {/* Real-Life Analogies Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 flex items-center">
            <i className="fa-solid fa-lightbulb mr-3 text-yellow-500"></i>Real-Life PWM Analogies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-gray-700 p-5 rounded-xl">
              <h3 className="text-xl font-medium text-blue-800 dark:text-blue-200 mb-3">Fan Speed Control</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Imagine using a fan on a hot day:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                <li>High speed: Fan runs continuously (100% duty cycle)</li>
                <li>Medium speed: Runs for 3 seconds, stops for 1 second (75% duty cycle)</li>
                <li>Low speed: Runs for 1 second, stops for 3 seconds (25% duty cycle)</li>
              </ul>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                Even though the fan cycles on and off at lower speeds, it happens so quickly that we don't notice the pauses—we only feel less air movement.
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-gray-700 p-5 rounded-xl">
              <h3 className="text-xl font-medium text-green-800 dark:text-green-200 mb-3">Shower Temperature Control</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When adjusting shower temperature:
              </p>
              <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
                <li>Too hot: Decrease hot water ratio (lower hot water duty cycle)</li>
                <li>Too cold: Increase hot water ratio (higher hot water duty cycle)</li>
                <li>Just right: Find the perfect hot-cold water mix ratio</li>
              </ul>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                This is very similar to how PWM controls voltage or current!
              </p>
            </div>
          </div>
        </section>
        
        {/* Applications Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 flex items-center">
            <i className="fa-solid fa-cogs mr-3 text-purple-500"></i>Practical Applications of PWM
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {applicationExamples.map((example, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-600"
              >
                <div className="h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-4">
                  <img 
                    src={`https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=${example.imagePrompt}`} 
                    alt={example.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{example.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{example.description}</p>
                </div>
              </div>
            ))}
          </div>
         </section>
         
         {/* Comparison Section */}
         <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-10 transform transition-all duration-300 hover:shadow-xl">
           <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-6 flex items-center">
             <i className="fa-solid fa-balance-scale mr-3 text-purple-500"></i>How These Applications Differ
           </h2>
           
           <div className="overflow-x-auto">
             <table className="min-w-full bg-white dark:bg-gray-700 rounded-xl shadow">
               <thead>
                 <tr className="bg-gray-100 dark:bg-gray-800">
                   <th className="py-3 px-4 text-left text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Application</th>
                   <th className="py-3 px-4 text-left text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">What PWM Controls</th>
                   <th className="py-3 px-4 text-left text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Typical Frequency</th>
                   <th className="py-3 px-4 text-left text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Special Considerations</th>
                 </tr>
               </thead>
               <tbody>
                 <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 font-medium">LED Brightness</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">Light intensity</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">500Hz-2kHz</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">Must be faster than human eye perception (above 50Hz)</td>
                 </tr>
                 <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 font-medium">Motor Speed</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">Rotation speed/torque</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">1kHz-20kHz</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">Requires motor driver circuits and often feedback systems</td>
                 </tr>
                 <tr className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 font-medium">Audio Volume</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">Sound amplitude</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">20kHz-1MHz</td>
                   <td className="py-3 px-4 border-b border-gray-200 dark:border-gray-600">Must be much higher than audio frequencies to avoid distortion</td>
                 </tr>
               </tbody>
             </table>
           </div>
           
           <div className="mt-6 bg-blue-50 dark:bg-gray-700 p-5 rounded-xl">
             <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-3">Key Takeaway:</h3>
             <p className="text-gray-700 dark:text-gray-300">
               While all three applications use PWM, they differ in frequency requirements and what physical property they control. The frequency is especially important - it must be much higher than the effect being controlled to work properly!
             </p>
           </div>
         </section>
         
         {/* Summary Section */}
         <section className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Summary</h2>
          <ul className="space-y-3 text-lg">
            <li className="flex items-start">
              <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
              <span>PWM adjusts output by controlling the ratio of "on" time to "off" time</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
              <span>"Duty cycle" is the percentage of time power is on, determining average output</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
              <span>PWM is widely used for LED brightness, motor speed, and volume control</span>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-check-circle mt-1 mr-2"></i>
              <span>Although PWM rapidly switches on and off, we usually don't perceive the switching—only the average effect</span>
            </li>
          </ul>
          <p className="mt-6 text-center text-xl font-medium">
            Now you understand the basic principles of PWM! Wasn't that simple?
          </p>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 px-4 text-center text-gray-600 dark:text-gray-400">
        <p>Science Explained | PWM Principles | Electronics for Middle School Students</p>
      </footer>
    </div>
  );
}