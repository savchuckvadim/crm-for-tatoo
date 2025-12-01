import { NextRequest, NextResponse } from 'next/server';
import { EModelName } from '../type/model';

type tParams = Promise<{ model: string, id: string, }>;
export async function GET(req: NextRequest, { params }: { params: tParams }) {
  const param = await params
  try {
    // Ждем параметры
    const model = param.model;

    if (!model) {
      return NextResponse.json({ error: 'Модель не указана' }, { status: 400 });
    }
    // Приводим к типу SModel
    const modelName = model as EModelName;
    const data = await fetch(`http://localhost:5000/api/${modelName}`);
    console.log('api GET', modelName);
    console.log(data);


    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка получения данных:', error);
    return NextResponse.json({ error: 'Ошибка получения данных' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: tParams }) {
  const param = await params
  // const model = param.model as SModel;
  try {
    const body = await req.json();
    // const data = await supaAPI.post(model, body);
    // return NextResponse.json({ message: 'Данные успешно добавлены', data });
  } catch (error) {
    // console.error(`Ошибка добавления данных в ${model}:`, error);
    // return NextResponse.json({ error: `Ошибка добавления в ${model}` }, { status: 500 });
  }
}
