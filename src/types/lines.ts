import type { Character } from './character';

export const LINE_TYPES = ['text', 'scene', 'option'] as const;

interface LineType {
  type: typeof LINE_TYPES[number];
  id: string;
}

export interface TextLine extends LineType {
  type: 'text';
  narrator: string;
  remote: Record<string, boolean>;
  text: string;
  narratorColor: string;
  sprites: string[];
}

export interface SceneLine extends LineType {
  type: 'scene';
  scene: 'background' | 'audio' | 'se';
  media: string;
  style: string;
  classes?: string[];
}

export interface OptionLine extends LineType {
  type: 'option';
  options: { key: string, value: string }[];
}

export type Line = TextLine | SceneLine | OptionLine;

export interface GfStory {
  characters: Character[];
  lines: Line[];
}

let id = 0;
export function initUniqueId(previous: GfStory) {
  if (previous.lines.length > 0) {
    id = previous.lines.map((line) => parseInt(line.id, 10))
      .filter((n) => Number.isFinite(n))
      .reduce((a, b) => Math.max(a, b), 0);
  }
}
export function nextId() {
  id += 1;
  return `${id}`;
}

export function defaultLine(): TextLine {
  return {
    type: 'text',
    id: nextId(),
    narrator: '',
    remote: {},
    text: '',
    narratorColor: '#ffffff',
    sprites: [],
  };
}
