FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["UsersApi/UsersApi.csproj", "UsersApi/"]
RUN dotnet restore "UsersApi/UsersApi.csproj"

COPY . .
WORKDIR "/src/UsersApi"
RUN dotnet publish "UsersApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
EXPOSE 8080

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "UsersApi.dll"]