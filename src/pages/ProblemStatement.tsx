
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Code, BookLock } from 'lucide-react';

const ProblemStatement = () => {
  const tracks = [
    {
      title: "The Transformation of ICS and Cyber Threats",
      description: "Explore the security challenges in Industrial Control Systems (ICS) as they transition from standalone to interconnected components of critical infrastructure.",
      difficulty: "Advanced",
      prize: "Goodies",
      icon: <Shield size={24} />,
      details: "Industrial Control Systems (ICS) are increasingly becoming targets for cyber attacks. Your challenge is to develop innovative solutions that can detect, prevent, and respond to cyber threats targeting critical infrastructure systems."
    },
    {
      title: "AI vs AI – Detecting Deepfake & Misinformation",
      description: "Combat AI-generated misinformation and deepfakes used for political manipulation, social engineering, financial scams, and cyber warfare.",
      difficulty: "Intermediate",
      prize: "Goodies",
      icon: <BookLock size={24} />,
      details: "With the rise of AI-generated content, distinguishing between authentic and fake media has become crucial. Create tools and techniques to identify deepfakes and misinformation campaigns that threaten democratic processes and social stability."
    },
    {
      title: "Trapping the Honey Trapper",
      description: "Develop solutions to counter social media honey traps targeting military personnel, government officials, and corporate executives.",
      difficulty: "Intermediate",
      prize: "Goodies",
      icon: <Code size={24} />,
      details: "Social engineering attacks through honey traps pose significant security risks to high-profile individuals and organizations. Build systems that can identify and prevent such attacks while protecting sensitive information and personnel."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen binary-bg pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 glow-text">Problem Statement</h1>
              <p className="text-xl text-gray-300 mb-8">
                Choose from three exciting tracks, each focused on a critical area of cybersecurity
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto space-y-8">
              {tracks.map((track, index) => (
                <div key={index} className="bg-cyber-darker border border-cyber-green/20 rounded-md p-6 cyber-border">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2 bg-cyber-green/10 rounded-md text-cyber-green shrink-0">
                      {track.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-2">
                        <h2 className="text-2xl font-bold">{track.title}</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          track.difficulty === 'Advanced' 
                            ? 'bg-red-500/20 text-red-300' 
                            : 'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {track.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyber-green/20 text-cyber-green">
                          Prize: {track.prize}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-4">{track.description}</p>
                      <div className="bg-cyber-gray/30 p-4 rounded-md">
                        <h3 className="font-semibold text-cyber-green mb-2">Challenge Details:</h3>
                        <p className="text-gray-300">{track.details}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <div className="bg-cyber-darker border border-cyber-green/20 rounded-md p-6 max-w-2xl mx-auto mb-8">
                <h3 className="text-xl font-semibold mb-4 text-cyber-green">Important Guidelines</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Teams can participate in only one track</li>
                  <li>• Team size: 3 members</li>
                  <li>• 24-hour coding marathon</li>
                  <li>• Solutions must be original and developed during the hackathon</li>
                  <li>• All code must be submitted via GitHub</li>
                  <li>• Detailed problem statements will be provided on the event day</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ProblemStatement;
