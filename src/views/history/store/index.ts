import { defineStore } from "pinia";
import { SeriesDto } from "@/views/home/interfaces";

interface StoreSerie {
  seriesHistory: SeriesDto[];
  seriesFavorite: SeriesDto[];
}
const existSerieInHistory = (id: number, seriesHistory: SeriesDto[]): boolean => {
  return seriesHistory.some((s: SeriesDto) => s.id === id);
};

export const useSeriesStore = defineStore("series", {
  state: (): StoreSerie => ({
    seriesHistory: [] as SeriesDto[],
    seriesFavorite: [] as SeriesDto[],
  }),

  actions: {
    
    addSerie(serie: SeriesDto) {
      if (!serie) return;

      if (existSerieInHistory(serie.id, this.seriesHistory)) {
        return;
      }
      const existsInFavorites = this.seriesFavorite.some((s: SeriesDto) => s.id === serie.id);
      if (existsInFavorites) {
        return;
      }
      this.seriesHistory.push(serie);
    
    },
    addFavoriteSerie(serie: SeriesDto) {
      if (!serie) return;

      if (existSerieInHistory(serie.id, this.seriesHistory)) {
        this.removeSerieFromHist(serie.id)
      }

      if (this.seriesFavorite.length < 10) {
        this.seriesFavorite.push(serie);
      } else {
        alert("You cannot add more than 10 favorites");
      }
     
      
    },
    removeFavoriteSerie(serieId: number) {
      this.seriesFavorite = this.seriesFavorite.filter((serie: SeriesDto) => serie.id !== serieId);
    },
    removeSerieFromHist(serieId: number) {
      this.seriesHistory = this.seriesHistory.filter((serie: SeriesDto) => serie.id !== serieId);
    }
  },
  
  
  getters: {
    isFavorite: (state) => (id: number): boolean => {
      return state.seriesFavorite.some((s: SeriesDto) => s.id === id);
    },
  },
  persist: true,
  
});
