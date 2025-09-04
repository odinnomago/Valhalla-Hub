import { NextResponse } from 'next/server';

// This would typically interact with a database
// For demo purposes, we'll use in-memory storage
let userProgress: Record<string, any> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'default';
  
  return NextResponse.json({
    userId,
    points: userProgress[userId]?.points || 0,
    level: userProgress[userId]?.level || 1,
    badges: userProgress[userId]?.badges || [],
    challenges: userProgress[userId]?.challenges || []
  });
}

export async function POST(request: Request) {
  const data = await request.json();
  const { userId, action, points } = data;
  
  if (!userProgress[userId]) {
    userProgress[userId] = {
      points: 0,
      level: 1,
      badges: [],
      challenges: []
    };
  }
  
  // Update points
  userProgress[userId].points += points || 0;
  
  // Check for level up
  const levels = [
    { id: 1, minPoints: 0, name: 'Iniciante' },
    { id: 2, minPoints: 500, name: 'Explorador' },
    { id: 3, minPoints: 1500, name: 'Membro' },
    { id: 4, minPoints: 3500, name: 'Expert' },
    { id: 5, minPoints: 7500, name: 'Mestre' }
  ];
  
  const currentLevel = levels.findLast(level => 
    userProgress[userId].points >= level.minPoints
  ) || levels[0];
  
  userProgress[userId].level = currentLevel.id;
  
  // Handle specific actions
  switch (action) {
    case 'completeChallenge':
      const challengeId = data.challengeId;
      if (challengeId && !userProgress[userId].challenges.includes(challengeId)) {
        userProgress[userId].challenges.push(challengeId);
      }
      break;
      
    case 'earnBadge':
      const badgeId = data.badgeId;
      if (badgeId && !userProgress[userId].badges.includes(badgeId)) {
        userProgress[userId].badges.push(badgeId);
      }
      break;
  }
  
  return NextResponse.json({
    success: true,
    userId,
    points: userProgress[userId].points,
    level: userProgress[userId].level,
    badges: userProgress[userId].badges,
    challenges: userProgress[userId].challenges
  });
}