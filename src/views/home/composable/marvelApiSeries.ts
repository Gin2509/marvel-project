import { ref } from "vue";
import { AxiosResponse } from "axios";
import HttpApiClient from "@/config/axios";
import { Result, SeriesDto } from "@/views/home/interfaces";

export default function useSeries() {
  const series = ref<SeriesDto[]>([]);
  const loading = ref(false);
  const isError = ref(false);
  const page = ref<number>(1);
  const limit = 20;
  const seriesDetail = ref<SeriesDto>({} as SeriesDto);

  const fetchSeries = async () => {
    if (loading.value) return;
    loading.value = true;
    try {
      const response: AxiosResponse = await HttpApiClient.getHttp(
        "/v1/public/series",
        {
          params: {
            limit,
            offset: (page.value - 1) * limit,
          },
        }
      );
      if (response.status === 200) {
        const seriesList: SeriesDto[] = response.data.data.results.map(
          (item: Result) => ({
            id: item.id,
            title: item.title,
            type: item.type,
            startYear: item.startYear,
            endYear: item.endYear,
            image: `${item.thumbnail.path}.${item.thumbnail.extension}`,
            resourceRelationship: [
              {
                typeResource: "stories",
                count: item.stories.available,
              },
              {
                typeResource: "comics",
                count: item.comics.available,
              },
              {
                typeResource: "characters",
                count: item.characters.available,
              },
              {
                typeResource: "events",
                count: item.events.available,
              }
            ],
          })
        );

        series.value = [...series.value, ...seriesList];
        page.value++;
        return
      } 
        isError.value = true;
        console.error(response.data.data.status);
    } catch (error: any) {
      console.error("Error fetching series:", error);
    } finally {
      loading.value = false;
    }

  };

  const fetchSeriesDetails = async (seriesId: number) => {
    loading.value = true;
    try {
      const response: AxiosResponse = await HttpApiClient.getHttp(`/v1/public/series/${seriesId}`);
      if (response.status === 200) {
        const item: Result = response?.data?.data?.results[0];
        seriesDetail.value  = {
          id: item.id,
          title: item.title,
          type: item.type,
          startYear: item.startYear,
          endYear: item.endYear,
          image: `${item?.thumbnail?.path}.${item?.thumbnail?.extension}`,
          resourceRelationship: [
            { typeResource: "stories", count: item.stories.available },
            { typeResource: "comics", count: item.comics.available },
            { typeResource: "characters", count: item.characters.available },
            { typeResource: "creators", count: item.creators.available },
            { typeResource: "events", count: item.events.available },
          ],
          description: item?.description ?? "",
        };
       return
      }
        isError.value = true;
        console.error(response.data.data.status);
    } catch (error: any) {
      isError.value = true;
      console.error("Error fetching series:", error);
    } finally {
      loading.value = false;
    }

  };

  const fetchResource = async (seriesId: number, resource: string) => {
    try {
      const response: AxiosResponse = await HttpApiClient.getHttp(
        `/v1/public/series/${seriesId}/${resource}`
      );
      if (response.status === 200) return response.data.data.results;
      console.error(`Error fetching ${resource}:`, response.data.data.status);
    } catch (error: any) {
      console.error(`Error fetching ${resource}:`, error);
    }
  };

  return {
    series,
    fetchSeries,
    loading,
    isError,
    fetchSeriesDetails,
    fetchResource,
    seriesDetail
  };
}
