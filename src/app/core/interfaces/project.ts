
export interface Project {
  id: number;
  arTitle: string;
  arDescription: string;
  enTitle: string;
  enDescription: string;
  arLocationName: string;
  enLocationName: string;
  locationUrl: string;
  latitude: number;
  longitude: number;
  videoFile: string | null;
  videoPath: string | null;
  imageFiles: string[] | null;

  projectImages: {
    id: number;
    imagePath: string;
    projectId: number;
  }[];

  projectStatusId: number;
  projectStatus: {
    id: number;
    enName: string;
    arName: string;
  } | null;

  projectTypeId: number;
  projectType: {
    id: number;
    enName: string;
    arName: string;
  } | null;
  interfaceImagePath:string | null
  proposalFilePath:string | null
}
