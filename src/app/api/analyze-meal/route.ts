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
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analise esta imagem de refeição e forneça as seguintes informações em formato JSON:
              
              {
                "ingredients": ["lista de todos os alimentos identificados"],
                "calories": número total estimado de calorias,
                "macros": {
                  "carbs": gramas de carboidratos,
                  "protein": gramas de proteína,
                  "fat": gramas de gordura
                },
                "healthierSuggestion": "uma sugestão de versão mais saudável desta refeição"
              }
              
              Seja preciso e realista nas estimativas. Se não conseguir identificar algo claramente, faça uma estimativa conservadora.`,
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
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
