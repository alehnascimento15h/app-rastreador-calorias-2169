import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, mealType } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo mais rápido e econômico
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analise rapidamente esta refeição e retorne JSON:
              
              {
                "ingredients": ["lista de alimentos"],
                "calories": número total de calorias,
                "macros": {
                  "carbs": gramas,
                  "protein": gramas,
                  "fat": gramas
                },
                "healthierSuggestion": "sugestão breve"
              }
              
              Seja rápido e direto.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'low', // Processamento mais rápido
              },
            },
          ],
        },
      ],
      max_tokens: 500, // Reduzido para resposta mais rápida
      temperature: 0.3, // Mais determinístico e rápido
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    const analysis = JSON.parse(content);

    return NextResponse.json({
      success: true,
      data: {
        ingredients: analysis.ingredients || [],
        calories: analysis.calories || 0,
        macros: {
          carbs: analysis.macros?.carbs || 0,
          protein: analysis.macros?.protein || 0,
          fat: analysis.macros?.fat || 0,
        },
        healthierSuggestion: analysis.healthierSuggestion || '',
      },
    });
  } catch (error) {
    console.error('Error analyzing meal:', error);
    return NextResponse.json(
      { error: 'Failed to analyze meal image' },
      { status: 500 }
    );
  }
}
